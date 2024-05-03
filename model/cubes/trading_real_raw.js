cube("trading_real_raw", {
  sql: `
  SELECT * FROM wh_raw.trading_real_raw
  WHERE close_time_dt >= '2024-01-01'
      AND open_time_dt >= '2024-01-01'
      AND cmd <= 2
      `,

  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `number`,
      primaryKey: true,
    },
    operationId: {
      sql: `operation_id`,
      type: `number`,
    },
    closeTimeSinceAccOpen: {
      sql: `close_time_since_acc_open`,
      type: `number`,
    },
    closeTimeSinceReg: {
      sql: `close_time_since_reg`,
      type: `number`,
    },
    cmd: {
      sql: `cmd`,
      type: `number`,
    },
    isClosedByHedge: {
      sql: `is_closed_by_hedge`,
      type: `string`,
    },
    isPending: {
      sql: `is_pending`,
      type: `string`,
    },
    leverageAtOpen: {
      sql: `leverage_at_open`,
      type: `number`,
    },
    spreadClose: {
      sql: `spread_close`,
      type: `number`,
    },
    spreadOpen: {
      sql: `spread_open`,
      type: `number`,
    },
    status: {
      sql: `status`,
      type: `string`,
    },
    tradingAccountId: {
      sql: `trading_account_id`,
      type: `number`,
    },
    tradingAccountLeverage: {
      sql: `trading_account_leverage`,
      type: `number`,
    },
    type: {
      sql: `type`,
      type: `number`,
    },
    balance: {
      sql: `balance`,
      type: `number`,
    },
    balanceAtClose: {
      sql: `balance_at_close`,
      type: `number`,
    },
    closePrice: {
      sql: `close_price`,
      type: `number`,
    },
    marginAtOpen: {
      sql: `margin_at_open`,
      type: `number`,
    },
    openPrice: {
      sql: `open_price`,
      type: `number`,
    },
    profit: {
      sql: `profit`,
      type: `number`,
    },
    symbolName: {
      sql: `symbol_name`,
      type: `string`,
    },
    tradingAccountCurrency: {
      sql: `trading_account_currency`,
      type: `string`,
    },
    volume: {
      sql: `volume`,
      type: `number`,
    },
    initialOpenVolume: {
      sql: `initial_open_volume`,
      type: `number`,
    },
    platformName: {
      sql: `platform_name`,
      type: `string`,
    },
    openDealPrice: {
      sql: `open_deal_price`,
      type: `number`,
    },
    accountCreatedDt: {
      sql: `account_created_dt`,
      type: `time`,
    },
    closeTimeDt: {
      sql: `close_time_dt`,
      type: `time`,
    },
    openTimeDt: {
      sql: `open_time_dt`,
      type: `time`,
    },
    registeredDt: {
      sql: `registered_dt`,
      type: `time`,
    },
    timestamp: {
      sql: `open_time_dt`,
      type: `time`,
    },
  },

  measures: {
    count: {
      type: `count`,
      filters: [{ sql: `${CUBE}.symbol_name is not null` }],
    },
  },
});
