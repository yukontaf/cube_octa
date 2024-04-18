cube(`fct_failed_pushes`, {
  sql: `
    SELECT
      fpu.user_id,
      ibe.timestamp,
      ibe.campaign_id,
      ibe.error
    FROM
      ${CUBE.failed_pushes_users} AS fpu
      JOIN ${CUBE.int_bloomreach_events_enhanced} AS ibe ON fpu.user_id = ibe.user_id
    WHERE
      ibe.action_type = 'mobile notification'
        AND ibe.status = 'failed'
  `,

  joins: {
    failed_pushes_users: {
      sql: `${CUBE}.user_id = ${failed_pushes_users}.user_id`,
      relationship: `belongsTo`
    },
    int_bloomreach_events_enhanced: {
      sql: `${CUBE}.user_id = ${int_bloomreach_events_enhanced}.user_id`,
      relationship: `belongsTo`
    }
  },

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
    eventType: {
      sql: `event_type`,
      type: `string`
    }
  }
});