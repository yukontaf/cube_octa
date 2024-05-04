cube("bloomreach_events", {
  sql: `
    SELECT
        internal_customer_id
        , SAFE_CAST(user_id AS INT64) as user_id
        , timestamp
        , campaign_id
        , action_id
        , type
        , properties.campaign_name
        , properties.status
        , properties.error
        , properties.action_name
        , properties.action_type
        , properties.variant
        , properties.platform
        , ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY timestamp ASC) AS event_number
    FROM bloomreach_raw.campaign
    WHERE timestamp >= '2024-01-01'
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
