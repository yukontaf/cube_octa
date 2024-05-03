cube(`eligible_users`, {
  sql: `
    WITH
    u AS (
        SELECT DISTINCT user_id
        FROM wh_raw.users
        WHERE EXTRACT(YEAR FROM registered_dt) = 2024
    )

    , b AS (
        SELECT DISTINCT SAFE_CAST(user_id AS INT64) AS user_id
        FROM bloomreach_raw.campaign WHERE
            DATE(timestamp) BETWEEN '2024-01-01' AND DATE(CURRENT_TIMESTAMP)
            AND SAFE_CAST(user_id AS INT64) IN (SELECT user_id FROM u)
            AND properties.action_type = 'mobile notification'
            AND properties.status = 'delivered'
    )

SELECT * FROM b
    `,

  joins: {
    uninstalls: {
      relationship: `one_to_many`,
      sql: `${CUBE}.user_id = ${uninstalls}.user_id`,
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [userId],
    },
    count_distinct: {
      type: `count_distinct`,
      sql: `user_id`,
    },
  },

  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `string`,
      primaryKey: true,
      puclic: true,
    },
  },
});
