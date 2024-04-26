cube(`fct_failed_pushes`, {
  sql: `
    SELECT
      fpu.user_id,
      fpu.appsflyer_id,
      ibe.timestamp,
      ibe.campaign_id,
      ibe.error
    FROM
      ${CUBE.failed_pushes_users.sql()} AS fpu
      LEFT JOIN ${CUBE.int_bloomreach_events_enhanced.sql()} AS ibe ON fpu.user_id = ibe.user_id
    WHERE
      ibe.action_type = 'mobile notification'
          AND ibe.status = 'failed'`
    ,
  measures: {
    count: {
      type: `count`,
      sql: `user_id`,
      title: `Count of Failed Mobile Notifications`
    }
  },

  dimensions: {
    userId: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true
      },
      appsflyerId: {
        sql: `appsflyer_id`,
        type: `string`,
        primaryKey: true
      },
    timestamp: {
      sql: `timestamp`,
      type: `time`
    },
    actionType: {
      sql: `action_type`,
      type: `string`
    },
    error: {
      sql: `error`,
      type: `string`
    }
    },
});