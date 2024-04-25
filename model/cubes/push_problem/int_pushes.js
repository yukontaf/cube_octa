cube(`int_pushes`, {
  sql: `SELECT * FROM dev_gsokolov.int_pushes`,

  measures: {
    count: {
      type: `count`
    },
    count_distinct: {
      type: `count_distinct`,
      sql: `user_id`
    }
  },

  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true,
      public: true,
      shown: true
    },
    has_uninstall: {
      sql: `CASE WHEN uninstall_time is not null then True else False end`,
      type: `boolean`
    },
    appsflyer_id: {
      sql: `appsflyer_id`,
      type: `string`
    },
    uninstall_time: {
      sql: `uninstall_time`,
      type: `time`
    },

    status: {
      sql: `status`,
      type: `string`
    },
    action_type: {
      sql: `action_type`,
      type: `string`
    },
    timestamp: {
      sql: `timestamp`,
      type: `time`
    },
    token: {
      sql: `token`,
      type: `string`
    }
  }
});