cube(`failed_pushes_users`, {
    sql: `
    SELECT
      e.user_id,
      a.appsflyer_id
    FROM
      ${int_bloomreach_events_enhanced.sql()} e
      INNER JOIN ${int_af_id.sql()} a
      ON e.user_id = a.user_id
    WHERE
      timestamp > '2024-01-01T00:00:00.000'
      AND timestamp < '2024-12-31T23:59:59.999'
      AND (
        action_type = 'mobile notification'
      )
      AND (status = 'failed')
      AND (appsflyer_id is not null)
    GROUP BY
      1,
      2 `,

    measures: {
        count: {
            type: `count`
        }
    },

    dimensions: {
        userId: {
            sql: `user_id`,
            type: `number`,
            primaryKey: true
        },
        appsflyer_id: {
            sql: `appsflyer_id`,
            type: `string`,
        }
    }
});