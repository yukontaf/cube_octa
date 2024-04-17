cube("ab_users_reactivation", {
  extends: bloomreach_events,

  segments: {
    filter_users: {
      sql: `${CUBE}.campaign_id = '65733b51df03a1daadeb772d' AND ${CUBE}.action_id = 443`,
    },
  },

  joins: {
    bloomreach_events: {
      relationship: "hasMany",
      sql: `${CUBE}.user_id = ${bloomreach_events.user_id}`,
    },
    deals_funnel: {
      sql: `${CUBE}.user_id = ${deals_funnel.userId}`,
      relationship: `belongsTo`,
    },
    trading_real_raw: {
      sql: `${CUBE}.user_id = ${trading_real_raw.user_id}`,
      relationship: `belongsTo`,
    },
  },
});
