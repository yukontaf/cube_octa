const Funnels = require("Funnels");

cube("deals_funnel", {
  extends: Funnels.eventFunnel({
    joins: {
      trading_real_raw: {
        relationship: "belongsTo",
        sql: `${CUBE}.user_id = ${trading_real_raw}.user_id AND ${trading_real_raw}.symbol_name = 'XAUUSD'`,
      },
    },
    userId: {
      sql: "user_id",
    },
    time: {
      sql: "timestamp",
    },
    steps: [
      {
        name: `pushes`,
        eventsView: {
          sql: `SELECT CAST(user_id AS STRING) AS user_id, timestamp FROM ${event_stream.sql()} where event_nature='communication' and event_type='mobile notification'`,
        },
      },
      {
        name: `deal`,
        eventsView: {
          sql: `SELECT CAST(user_id AS STRING) AS user_id, timestamp FROM ${event_stream.sql()} where event_nature='deal'`,
        },
        timeToConvert: "3 day",
      },
    ],
  }),
  // preAggregations: {
  //   main: {
  //     type: `originalSql`,
  //   },
  //   ab_stats_rollup: {
  //     measures: [deals_funnel.conversions],
  //     dimensions: [deals_funnel.step, ab_users_reactivation.user_id],
  //     segments: [
  //       ab_users_reactivation.ab_users,
  //       ab_users_reactivation.filter_users,
  //     ],
  //     timeDimension: deals_funnel.time,
  //     granularity: `day`,
  //   },
  // },
});
