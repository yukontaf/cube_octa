cube(`uninstalls`, {
  sql: `
    SELECT * FROM wh_raw.appsflyer_uninstall_events_report
    WHERE install_time >= '2024-01-01'
    `,

  measures: {
    count: {
      type: `count`,
      drillMembers: [appsflyer_id],
    },
  },

  dimensions: {
    appsflyer_id: {
      sql: `appsflyer_id`,
      type: `string`,
      primaryKey: true,
      public: true,
    },
  },
});
