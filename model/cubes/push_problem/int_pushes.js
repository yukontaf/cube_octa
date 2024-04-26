cube(`int_pushes`, {
  sql: `SELECT * FROM dev_gsokolov.int_bloomreach_events_enhanced where 
  safe_cast(user_id as int64) in (select user_id from ${eligible_users.sql()})
  and action_type = 'mobile notification' and date(timestamp) between '2024-01-01' and date(current_timestamp)
  and status in ('delivered', 'failed')`,

  measures: {
    count: {
      type: `count`,
      drillMembers: [userId]
    },
    count_distinct: {
      type: `count_distinct`,
      sql: `user_id`
    },
    rolling_count: {
      sql: `case when ${CUBE}.status='delivered' then 1 else 0 end`,
      type: `sum`,
      rolling_window: {
        trailing: `7 day`,
      },
    },
  },

  dimensions: {
    userId: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true,
      public: true
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
    }
  }
});