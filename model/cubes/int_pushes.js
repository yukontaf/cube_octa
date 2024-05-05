cube(`int_pushes`, {
  sql: `
    SELECT
      user_id,
      campaign_id,
      action_id,
      event_number,
      status,
      first_push,
      timestamp,
      LEAD(timestamp) OVER (PARTITION BY user_id, campaign_id, action_id ORDER BY timestamp ASC) AS next_timestamp,
      CASE
        WHEN status = 'failed' AND LEAD(status) OVER (PARTITION BY user_id, campaign_id, action_id ORDER BY timestamp ASC) = 'delivered'
        THEN TIMESTAMP_DIFF(LEAD(timestamp) OVER (PARTITION BY user_id, campaign_id, action_id ORDER BY timestamp ASC), timestamp, SECOND)
        ELSE NULL
      END AS timedelta
    FROM (
      SELECT
        user_id,
        campaign_id,
        action_id,
        TIMESTAMP as timestamp,
        status,
        ROW_NUMBER() OVER (PARTITION BY user_id, CONCAT(campaign_id, '_', CAST(action_id AS STRING)) ORDER BY timestamp) as event_number,
        CASE WHEN event_number = 1 THEN timestamp END AS first_push
      FROM dev_gsokolov.stg_bloomreach_events
      WHERE SAFE_CAST(user_id AS INT64) IN (
        SELECT user_id FROM ${eligible_users.sql()}
      )
      AND action_type = 'mobile notification'
      AND DATE(timestamp) BETWEEN '2024-01-01' AND CURRENT_DATE()
      AND status IN ('delivered', 'failed')
    ) detailed_events
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
