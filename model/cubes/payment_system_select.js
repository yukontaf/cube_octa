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
      sql: `${CUBE}.user_id = CAST(${DepositsEnhanced}.user_id AS STRING)`,
    },
  },
  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true,
    },
    registeredDt: {
      sql: `registered_dt`,
      type: `time`,
    },
    paymentSystemName: {
      sql: `payment_system_name`,
      type: `string`,
    },
    time: {
      sql: `time`,
      type: `time`,
    },
    eventNumber: {
      sql: `event_number`,
      type: `number`,
    },
    regWeekStart: {
      sql: `DATE_TRUNC(registered_dt, WEEK(MONDAY))`,
      type: `time`,
    },
    daysAfterReg: {
      sql: `TIMESTAMP_DIFF(time, registered_dt, SECOND) / (60 * 60 * 24)`,
      type: `number`,
    },
    daysSinceRegistration: { sql: `daysSinceRegistration`, type: `number` },
  },

  measures: {
    countDistinct: {
      sql: `user_id`,
      type: `countDistinct`,
      filters: [{ sql: `${CUBE}.time >= '2024-01-01'` }],
    },
    targetConversionsCount: {
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
      sql: `${CUBE}.event_number = 1 AND ${daysAfterReg} > 3 AND ${CUBE}.user_id is not NULL`,
    },
    notDep: {
      sql: `${daysAfterReg} > 3`,
    },
  },
});
