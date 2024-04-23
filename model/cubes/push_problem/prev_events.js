cube(`prev_events`, {
  sql: `
    SELECT 
      ${int_bloomreach_events_enhanced.appsflyer_id}, user_id, timestamp, status, campaign_name, action_id,
      LAG(status) OVER (PARTITION BY user_id ORDER BY timestamp) as previous_status,
      LAG(event_id) OVER (PARTITION BY user_id ORDER BY timestamp) as previous_event_id,
      LAG(timestamp) OVER (PARTITION BY user_id ORDER BY timestamp) as previous_timestamp
    FROM 
      ${int_bloomreach_events_enhanced.sql()}
  `,

  measures: {
    timedelta: {
      type: `number`,
      sql: `TIMESTAMP_DIFF(${CUBE}.timestamp, ${CUBE}.previous_timestamp, SECOND)`
    },
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
      sql: `${CUBE}.appsflyer_id`
    },
    count_distinct: {
      type: `count_distinct`,
      sql: `${CUBE}.appsflyer_id`
    },
    avg_delta: {
      type: `avg`,
      sql: `${timedelta}`
    }
  },

  dimensions: {
    appsflyer_id: {
      sql: `appsflyer_id`,
      type: `string`,
      primaryKey: true
    },
    user_id: {
      sql: `user_id`,
      type: `string`
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
    previousTimestamp: {
      sql: `previous_timestamp`,
      type: `time`
    }
  }
});