const Funnels = require("Funnels");

cube("deals_funnel", {
  extends: Funnels.eventFunnel({
    joins: {
      trading_real_raw: {
        relationship: "belongsTo",
        sql: `${CUBE}.user_id = ${trading_real_raw}.user_id AND ${trading_real_raw}.symbol_name = 'XAUUSD' and timestamp between 2024-04-01 and 2024-04-10`,
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
          sql: `SELECT CAST(user_id AS STRING) AS user_id, timestamp FROM ${bloomreach_events.sql({ segments: ["mobile_notification"] })}`,
        },
      },
      {
        name: `deal`,
        eventsView: {
          sql: `SELECT CAST(user_id AS STRING) AS user_id, open_time_dt AS timestamp FROM ${trading_real_raw.sql()}`,
        },
        timeToConvert: "1 day",
      },
    ],
  }),
  preAggregations: {
    main: {
      type: `originalSql`,
    },
    ab_stats_rollup: {
      measures: [deals_funnel.conversions],
      dimensions: [deals_funnel.step, ab_users_reactivation.user_id],
      segments: [
        ab_users_reactivation.ab_users,
        ab_users_reactivation.filter_users,
      ],
      timeDimension: deals_funnel.time,
      granularity: `day`,
    },
  },
});
