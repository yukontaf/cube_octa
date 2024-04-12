cube(`deposits_enhanced`, {
  sql: `SELECT * FROM wh_raw.deposits_enhanced WHERE created_dt >= '2024-01-01'`,

  joins: {
    payment_system_select: {
      relationship: `one_to_one`,
      sql: `${CUBE}.user_id = ${payment_system_select}.user_id`,
    },
  },

  dimensions: {
    depositId: {
      sql: `deposit_id`,
      type: `string`,
      primaryKey: true,
    },
    user_id: {
      sql: `user_id`,
      type: `number`,
    },
    timeSinceRegistration: {
      sql: `time_since_registration`,
      type: `number`,
    },
    timeSinceAccountOpening: {
      sql: `time_since_account_opening`,
      type: `number`,
    },
    daysSinceRegistration: {
      sql: `${CUBE}.time_since_registration / 86400`,
      type: `number`,
    },
    daysSinceAccountOpening: {
      sql: `${CUBE}.time_since_account_opening / (3600*24)`,
      type: `number`,
    },
    platform: {
      sql: `platform`,
      type: `number`,
    },
    leverage: {
      sql: `leverage`,
      type: `number`,
    },
    accountType: {
      sql: `account_type`,
      type: `number`,
    },
    paymentTransactionId: {
      sql: `payment_transaction_id`,
      type: `number`,
    },
    depositNumber: {
      sql: `deposit_number`,
      type: `number`,
    },
    timeSinceLastDeposit: {
      sql: `time_since_last_deposit`,
      type: `number`,
    },
    depositType: {
      sql: `deposit_type`,
      type: `string`,
    },
    amount: {
      sql: `amount`,
      type: `string`,
    },
    amountUsd: {
      sql: `amount_usd`,
      type: `string`,
    },
    currency: {
      sql: `currency`,
      type: `string`,
    },
    countryCode: {
      sql: `country_code`,
      type: `string`,
    },
    createdDt: {
      sql: `created_dt`,
      type: `time`,
    },
    responseCreatedDt: {
      sql: `response_created_dt`,
      type: `time`,
    },
  },

  measures: {
    count: {
      type: `count`,
    },
  },
  segments: {
    target: {
      sql: `${daysSinceRegistration} > 3`,
    },
  },

  preAggregations: {
    // Define any pre-aggregations here.
  },
});
