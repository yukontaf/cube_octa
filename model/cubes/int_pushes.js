cube(`int_pushes`, {
  sql: `
    select * from dev_gsokolov.int_pushes
  `,

  measures: {
    countDelivered: {
      sql: `COUNT(DISTINCT CASE WHEN status = 'delivered' THEN user_id ELSE NULL END)`,
      type: `count`,
    },
    countFailed: {
      sql: `COUNT(DISTINCT CASE WHEN status = 'failed' THEN user_id ELSE NULL END)`,
      type: `count`,
    },
    count: {
      type: `count`,
    },
    avgTimeDelta: {
      sql: `timedelta`,
      type: `avg`
    }
  },

  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true,
    },
    event_id: {
      sql: `event_id`,
      type: `string`,
    },
    campaign_id: {
      sql: `campaign_id`,
      type: `string`
    },
    action_id: {
      sql: `action_id`,
      type: `number`
    },
    status: {
      sql: `status`,
      type: `string`
    },
    timestamp: {
      sql: `timestamp`,
      type: `time`
    },
    next_timestamp: {
      sql: `next_timestamp`,
      type: `time`
    },
    timedelta: {
      sql: `timedelta`,
      type: `number`
    }
  },
});
