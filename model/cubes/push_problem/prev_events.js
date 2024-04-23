cube(`prev_events`, {
  sql: `
    SELECT 
      user_id, timestamp, status, campaign_name, action_id,
      LAG(status) OVER (PARTITION BY user_id ORDER BY timestamp) as previous_status,
      LAG(campaign_name) OVER (PARTITION BY user_id ORDER BY timestamp) as previous_event_id,
      LAG(timestamp) OVER (PARTITION BY user_id ORDER BY timestamp) as previous_timestamp
    FROM 
      ${int_bloomreach_events_enhanced.sql()}
  `,

  measures: {
    first_event: {
      sql: `timestamp`,
      type: `min`,
      filters: [
        { sql: `${CUBE}.status = 'failed'` }
      ]
    },
    last_event: {
      sql: `timestamp`,
      type: `max`,
      filters: [
        { sql: `${CUBE}.status = 'failed'` }
      ]
    },
    count: {
      type: `count`,
      sql: `${CUBE}.user_id`
    },
    count_distinct: {
      type: `count_distinct`,
      sql: `${CUBE}.user_id`
    },

    avg_user_delta: {
      sql: `${timedelta}`,
      type: `avg`
    },
    //   avg_delta: {
    //   type: `avg`,
    //   sql: `${avg_user_delta}`
    // },
  },

  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `string`
    },
    timedelta: {
      type: `number`,
      sql: `TIMESTAMP_DIFF(${CUBE}.timestamp, ${CUBE}.previous_timestamp, SECOND)`
    },
    status: {
      sql: `status`,
      type: `string`
    },
    campaign_name: {
      sql: `campaign_name`,
      type: `string`
    },
    action_id: {
      sql: `action_id`,
      type: `string`
    },
    timestamp: {
      sql: `timestamp`,
      type: `time`
    },
    previous_status: {
      sql: `previous_status`,
      type: `string`
    },
    previous_timestamp: {
      sql: `previous_timestamp`,
      type: `time`
    }
  }
});