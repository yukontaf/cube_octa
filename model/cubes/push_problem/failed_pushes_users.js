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
  preAggregations: {
    failed_users: {
      dimensions: [
        failed_pushes_users.appsflyerId,
        failed_pushes_users.userId
      ],
      indexes: {
        indexName: {
          columns: [
            failed_pushes_users.userId,
            failed_pushes_users.appsflyerId
          ]
        }
      }
    },
    failed_pushes: {
      type: `rollup`,
      dimensions: [
        failed_pushes_users.campaignId,
        failed_pushes_users.campaignPolicy,
      ],
      measures: [
        failed_pushes_users.count,
        failed_pushes_users.distinct_users
      ],
      timeDimension: failed_pushes_users.timestamp,
      granularity: `day`,
      partitionGranularity: `week`
    }
  },
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
      type: `count`
    },
    distinct_users: {
      type: `countDistinct`,
      sql: `${userId}`
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
    campaignPolicy: {
      sql: `${int_bloomreach_events_enhanced.campaign_policy}`,
      type: `string`
    },
    timestamp: {
      sql: `${int_bloomreach_events_enhanced.timestamp}`,
      type: `time`
    }
  }
});