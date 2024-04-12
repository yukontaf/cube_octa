cube(`users`, {
  sql: `SELECT * FROM wh_raw.users WHERE registered_dt >= '2024-01-01'`,

  joins: {
    deposits_enhanced: {
      relationship: `one_to_many`,
      sql: `${CUBE}.user_id = ${deposits_enhanced}.user_id`,
    },
    deposit_payment_system_select: {
      relationship: `one_to_many`,
      sql: `${CUBE}.user_id = ${deposit_payment_system_select}.user_id`,
    },
    bloomreach_events: {
      relationship: `one_to_many`,
      sql: `CAST(${CUBE}.user_id AS INT) = CAST(${bloomreach_events}.user_id AS INT)`,
    },
    deposits_funnel: {
      relationship: `one_to_many`,
      sql: `${CUBE}.user_id = ${deposits_funnel}.user_id`,
    },
    ab_users_reactivation: {
      relationship: `one_to_one`,
      sql: `${CUBE}.user_id = ${ab_users_reactivation}.user_id`,
    },
  },

  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true,
    },
    verification_status: {
      sql: `verification_status`,
      type: `number`,
    },
    is_email_verified: {
      sql: `is_email_verified`,
      type: `number`,
    },
    is_locked: {
      sql: `is_locked`,
      type: `number`,
    },
    last_login: {
      sql: `last_login`,
      type: `number`,
    },
    referrer_id: {
      sql: `referrer_id`,
      type: `number`,
    },
    is_unsubscribed: {
      sql: `is_unsubscribed`,
      type: `number`,
    },
    language_id: {
      sql: `language_id`,
      type: `number`,
    },
    support_language_id: {
      sql: `support_language_id`,
      type: `number`,
    },
    is_withdraw_disabled: {
      sql: `is_withdraw_disabled`,
      type: `number`,
    },
    phone_filled: {
      sql: `phone_filled`,
      type: `number`,
    },
    country_code: {
      sql: `country_code`,
      type: `string`,
    },
    deposited_total: {
      sql: `deposited_total`,
      type: `string`,
    },
    withdrawn_total: {
      sql: `withdrawn_total`,
      type: `string`,
    },
    registered_dt: {
      sql: `registered_dt`,
      type: `time`,
    },
    timestamp: {
      sql: `registered_dt`,
      type: `time`,
    },
  },

  measures: {
    count: {
      type: `count`,
      filters: [
        {
          sql: `${CUBE}.registered_dt >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 6*30 DAY)`,
        },
      ],
    },
  },
});
