cube(`int_pushes`, {
  sql: `
  SELECT
      *
      , CASE
          WHEN push_num = 1 THEN timestamp
      END AS first_push
  FROM (
      SELECT
          internal_customer_id
          , user_id
          , timestamp
          , campaign_id
          , action_id
          , properties.campaign_name
          , properties.status
          , properties.error
          , properties.action_name
          , ROW_NUMBER() OVER (
              PARTITION BY user_id
              ORDER BY timestamp
          ) AS push_num
      FROM bloomreach_raw.campaign
      WHERE SAFE_CAST(user_id AS INT64) IN (
              SELECT user_id
              FROM ${eligible_users.sql()}
          )
          AND properties.action_type = 'mobile notification'
          AND DATE(timestamp) BETWEEN '2024-01-01' AND DATE(CURRENT_TIMESTAMP)
          AND properties.status IN ('delivered', 'failed')
  )
  `,

  measures: {
    count: {
      type: `count`,
      drillMembers: [user_id],
    },
    count_distinct: {
      type: `count_distinct`,
      sql: `user_id`,
    },
  },

  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true,
      public: true,
    },
    campaign_name: {
      sql: `campaign_name`,
      type: `string`,
    },
    push_num: {
      sql: `push_num`,
      type: `number`,
    },
    status: {
      sql: `status`,
      type: `string`,
    },
    status_num: {
      sql: `CASE WHEN ${CUBE}.status='delivered' THEN 1 ELSE 0 END`,
      type: `number`,
    },
    action_name: {
      sql: `action_name`,
      type: `string`,
    },
    timestamp: {
      sql: `timestamp`,
      type: `time`,
    },
  },
});
