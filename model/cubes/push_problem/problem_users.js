cube(`BloomreachFailedMobileNotifications`, {
  sql: `
    SELECT
      int_bloomreach_events_enhanced.user_id,
      int_bloomreach_events_enhanced.timestamp
    FROM
      int_bloomreach_events_enhanced
    WHERE
      int_bloomreach_events_enhanced.timestamp > '2024-01-01T00:00:00.000'
      AND int_bloomreach_events_enhanced.timestamp < '2024-12-31T23:59:59.999'
      AND (
        int_bloomreach_events_enhanced.action_type = 'mobile notification'
      )
      AND (int_bloomreach_events_enhanced.status = 'failed')
    GROUP BY
      1,
      2 `,

  measures: {
    count: {
      type: `count`,
      drillMembers: [userId, timestamp]
    }
  },

  dimensions: {
    userId: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true
    },

    timestamp: {
      sql: `timestamp`,
      type: `time`
    }
  }
});