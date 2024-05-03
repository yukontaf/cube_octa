cube(`deposit_payment_system_select`, {
  sql: `
    SELECT
      p.*
      , u.registered_dt
      , ROW_NUMBER() OVER (PARTITION BY p.user_id ORDER BY time ASC) AS event_number
  FROM amplitude.events_octa_raw_deposit_payment_system_select AS p
      LEFT JOIN wh_raw.users AS u ON p.user_id = u.user_id
  WHERE p.time >= '2024-01-01'
  `,

  joins: {
    users: {
      sql: `${CUBE}.user_id = ${users}.user_id`,
      relationship: `belongsTo`,
    },
    deposits_enhanced: {
      sql: `${CUBE}.user_id = ${deposits_enhanced}.user_id`,
      relationship: `hasMany`,
    }
  },

  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true,
    },
    // Add other dimensions here
  },

  measures: {
    count_distinct: {
      sql: `user_id`,
      type: `countDistinct`,
    },
    target_conversions_count: {
      sql: `user_id`,
      type: `count`,
      rolling_window: {
        trailing: `14 day`,
        leading: `7 day`,
        offset: `start`,
      },
    },
    // Add other measures here
  },

  segments: {
    target_q2: {
      sql: `${CUBE}.event_number = 1 AND days_after_reg > 3 AND ${CUBE}.user_id is not NULL`,
    },
    not_dep: {
      sql: `days_after_reg > 3`,
    },
  },
});
