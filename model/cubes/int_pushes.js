cube(`int_pushes`, {
  sql: `
  SELECT
      *
      , CASE
          WHEN event_number = 1 THEN timestamp
      END AS first_push
  FROM (
      SELECT *
      FROM ${bloomreach_events.sql()}
      WHERE SAFE_CAST(user_id AS INT64) IN (
              SELECT user_id
              FROM ${eligible_users.sql()}
          )
          AND action_type = 'mobile notification'
          AND DATE(timestamp) BETWEEN '2024-01-01' AND DATE(CURRENT_TIMESTAMP)
          AND status IN ('delivered', 'failed')
  )
  `,

  measures: {
    count_user_id: {
      type: `count`,
      sql: `user_id`,
    },
    count_distinct_user_id: {
      type: `count_distinct`,
      sql: `user_id`,
    },
  },

  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true,
    },
    campaign_name: {
      sql: `campaign_name`,
      type: `string`,
    },
    first_push: {
      sql: `first_push`,
      type: `time`,
    },
    push_num: {
      sql: `event_number`,
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
    action_id: {
      sql: `action_id`,
      type: `number`,
    },
    timestamp: {
      sql: `timestamp`,
      type: `time`,
    },
  },
});
