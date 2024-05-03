cube(`payment_system_select`, {
  sql: `
      SELECT
        p.*,
        ROW_NUMBER() OVER (PARTITION BY p.user_id ORDER BY time ASC) AS event_number,
        u.registered_dt
      FROM amplitude.events_octa_raw_deposit_payment_system_select p
      LEFT JOIN wh_raw.users u ON p.user_id = u.user_id
      WHERE p.time >= '2024-01-01'
    `,
  joins: {
    deposits_enhanced: {
      relationship: "belongsTo",
      sql: `${CUBE}.user_id = CAST(${deposits_enhanced}.user_id AS STRING)`,
    },
    users: {
      sql: `${CUBE}.user_id = ${users}.user_id`,
      relationship: `belongsTo`,
    },
  },
  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true,
    },
    registered_dt: {
      sql: `registered_dt`,
      type: `time`,
    },
    payment_system_name: {
      sql: `payment_system_name`,
      type: `string`,
    },
    time: {
      sql: `time`,
      type: `time`,
    },
    event_number: {
      sql: `event_number`,
      type: `number`,
    },
    reg_week_start: {
      sql: `DATE_TRUNC(registered_dt, WEEK(MONDAY))`,
      type: `time`,
    },
    days_after_reg: {
      sql: `TIMESTAMP_DIFF(time, registered_dt, SECOND) / (60 * 60 * 24)`,
      type: `number`,
    },
  },

  measures: {
    count_distinct: {
      sql: `user_id`,
      type: `countDistinct`,
      filters: [{ sql: `${CUBE}.time >= '2024-01-01'` }],
    },
    target_conversions_count: {
      type: `count`,
      rollingWindow: {
        trailing: `14 day`,
        leading: `7 day`,
        offset: `start`,
      },
    },
  },

  segments: {
    targetQ2: {
      sql: `${CUBE}.event_number = 1 AND ${days_after_reg} > 3 AND ${CUBE}.user_id is not NULL`,
    },
    not_dep_3d: {
      sql: `${days_after_reg} > 3`,
    },
  },
});
