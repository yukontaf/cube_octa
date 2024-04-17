cube("bloomreach_events", {
  sql: `
        SELECT
            *,
            ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY timestamp ASC) AS event_number
        FROM bloomreach_raw.campaign
        where timestamp >= '2024-01-01'
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
      shown: true,
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
      sql: `${CUBE}.properties.variant`,
      type: "string",
    },
    action_type: {
      sql: `${CUBE}.properties.action_type`,
      type: "string",
    },
    ingest_timestamp: {
      sql: "ingest_timestamp",
      type: "time",
    },
    timestamp: {
      sql: "timestamp",
      type: "time",
    },
    status: {
      sql: `${CUBE}.properties.status`,
      type: "string",
    },
    action_name: {
      sql: `${CUBE}.properties.action_name`,
      type: "string",
    },
    action_label: {
      sql: `${CUBE}.properties.action_label`,
      type: "string",
    },
    platform: {
      sql: `${CUBE}.properties.platform`,
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
      sql: `${CUBE}.user_id is not NULL AND ${CUBE}.properties.variant is not NULL`,
    },
    split_users: {
      sql: `${CUBE}.properties.action_type = 'split'`,
    },
    delivered_events: {
      sql: `${CUBE}.properties.status = 'delivered'`,
    },
    pushes: {
      sql: `${CUBE}.properties.action_type = 'mobile notification'`,
    },
  },

  // preAggregations: {
  //   dailyUserCount: {
  //     type: "rollup",
  //     measureReferences: [countDistinctUsers],
  //     timeDimensionReference: timestamp,
  //     granularity: "day",
  //     partitionGranularity: "week",
  //     external: true,
  //     buildRangeStart: {
  //       sql: `SELECT DATE_SUB(DATE(CURRENT_TIMESTAMP()), INTERVAL 3 MONTH)`,
  //     },
  //     buildRangeEnd: {
  //       sql: `SELECT DATE(CURRENT_TIMESTAMP())`,
  //     },
  //   },
  // },
});
