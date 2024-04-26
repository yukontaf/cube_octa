const Funnels = require("Funnels");

cube("push_funnel", {
  extends: Funnels.eventFunnel({
    userId: {
      sql: "user_id",
    },
    time: {
      sql: "timestamp",
    },
    steps: [
      {
        name: `reg`,
        eventsView: {
          sql: `SELECT CAST(c.failed_pushes_users__user_id AS STRING) AS user_id, registered_dt as timestamp FROM wh_raw.users u inner join ${corrupt_user_id.sql()} c on u.user_id = c.failed_pushes_users__user_id where registered_dt > '2024-01-01'`,
        },
      },
      {
        name: `install`,
        eventsView: {
            sql: `select cast(i.user_id as string) as user_id, i.install_timestamp as timestamp from (
                SELECT
                a.appsflyer_id,
                a.event_time_dt AS install_timestamp,
                cc.failed_pushes_users__user_id as user_id,
            FROM analytics-147612.wh_raw.mobile_appsflyer a
            inner join ${corrupt_user_id.sql()} cc on a.appsflyer_id = cc.failed_pushes_users__appsflyer_id
        ) i`,
        },
        timeToConvert: "3 day",
      },
    ],
  }),
});
