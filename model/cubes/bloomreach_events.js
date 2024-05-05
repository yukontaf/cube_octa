cube("bloomreach_events", {
  sql: `
    SELECT
        *
      from dev_gsokolov.stg_bloomreach_events
    `,

  dimensions: {
    campaign_id: {
      sql: "campaign_id",
      type: "string",
    },
    event_number: {
      sql: "event_number",
      type: "number",
    },
    distinct_event_number: {
      sql: "distinct_event_number",
      type: "number",
    },
    user_id: {
      sql: "user_id",
      type: "number",
      primaryKey: true,
    },
    internal_customer_id: {
      sql: "internal_customer_id",
      type: "string",
    },
    type: {
      sql: "type",
      type: "string",
    },
    action_id: {
      sql: "action_id",
      type: "number",
    },
    variant: {
      sql: `variant`,
      type: "string",
    },
    action_type: {
      sql: `action_type`,
      type: "string",
    },
    timestamp: {
      sql: "timestamp",
      type: "time",
    },
    status: {
      sql: `status`,
      type: "string",
    },
    action_name: {
      sql: `action_name`,
      type: "string",
    },
    platform: {
      sql: `platform`,
      type: "string",
    },
    time_to_delivered: {
        sql: `CASE
                WHEN ${CUBE}.status = 'sent'
                THEN LEAD(${CUBE}.timestamp, 1) OVER (PARTITION BY ${CUBE}.user_id ORDER BY ${CUBE}.timestamp)
                     - ${CUBE}.timestamp
                WHEN ${CUBE}.status = 'delivered'
                THEN ${CUBE}.timestamp 
                     - LAG(${CUBE}.timestamp, 1) OVER (PARTITION BY ${CUBE}.user_id ORDER BY ${CUBE}.timestamp)
                ELSE NULL
             END`,
        type: `time`
    },
  },

  measures: {
    count: {
      type: "count",
      filters: [{ sql: `${CUBE}.timestamp >= '2024-01-01'` }],
    },
    countDistinctUsers: {
      sql: `${CUBE}.user_id`,
      type: "countDistinct",
      description: "Counts distinct users",
    },
    count_delivered: {
      type: "count",
    },
  },

  segments: {
    ab_users: {
      sql: `${CUBE}.user_id is not NULL AND ${CUBE}.variant is not NULL`,
    },
    split_users: {
      sql: `${CUBE}.action_type = 'split'`,
    },
    delivered_events: {
      sql: `${CUBE}.status = 'delivered'`,
    },
    pushes: {
      sql: `${CUBE}.action_type = 'mobile notification'`,
    },
  },
});
