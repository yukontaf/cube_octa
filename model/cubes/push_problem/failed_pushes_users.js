cube(`failed_pushes_users`, {
  sql: `
    SELECT
      e.user_id,
      a.appsflyer_id
    FROM
      ${CUBE.int_bloomreach_events_enhanced.sql()} e
      INNER JOIN ${CUBE.int_af_id.sql()} a
      ON e.user_id = a.user_id
    WHERE
      e.timestamp > '2024-01-01T00:00:00.000'
      AND e.timestamp < '2024-12-31T23:59:59.999'
      AND (
        e.action_type = 'mobile notification'
      )
      AND (e.status = 'failed')
      AND (a.appsflyer_id is not null)
    GROUP BY
      1,
      2 `,
  joins: {
    int_bloomreach_events_enhanced: {
      relationship: `one_to_many`,
      sql: `${CUBE}.user_id = ${int_bloomreach_events_enhanced}.user_id`,
    },
    appsflyer_uninstall_events_report: {
      relationship: `one_to_many`,
      sql: `${CUBE}.appsflyerId = ${appsflyer_uninstall_events_report}.appsflyer_id`
    },
  },
  measures: {
    count: {
      type: `count`,
      sql: `user_id`
    },
    distinct_users: {
      type: `count_distinct`,
      sql: `user_id`
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
    },
    campaignId: {
      sql: `${int_bloomreach_events_enhanced.campaign_id}`,
      type: `string`
    },
    campaignName: {
      sql: `${int_bloomreach_events_enhanced.campaign_name}`,
      type: `string`
    },
    campaignPolicy: {
      sql: `${int_bloomreach_events_enhanced.campaign_policy}`,
      type: `string`
    },
    timestamp: {
      sql: `${int_bloomreach_events_enhanced.timestamp}`,
      type: `time`
    },
    error: {
      sql: `${int_bloomreach_events_enhanced.error}`,
      type: `string`
    },
    countryCode: {
      sql: `${int_bloomreach_events_enhanced.country_code}`,
      type: `string`
    },
    countryTier: {
      sql: `${int_bloomreach_events_enhanced.tier_name}`,
      type: `string`
    },
  }
});