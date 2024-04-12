// First step is to require the Funnel package
const Funnels = require(`Funnels`);

cube(`deposits_funnel`, {
  extends: Funnels.eventFunnel({
    userId: {
      sql: `user_id`,
    },
    time: {
      sql: `timestamp`,
    },
    steps: [
      {
        name: `registration`,
        eventsView: {
          sql: `select user_id, registered_dt as timestamp from wh_raw.users`,
        },
      },
      {
        name: `payment_system_select`,
        eventsView: {
          // sql: `select p.user_id, p.time as timestamp from amplitude.events_octa_raw_deposit_payment_system_select p left join wh_raw.deposits_enhanced d on p.user_id = d.user_id where d.time_since_registration / 86400 > 3`,
          sql: `select user_id, time as timestamp from ${payment_system_select.sql()}`,
        },
        timeToConvert: "10 day",
      },
    ],
  }),
});
