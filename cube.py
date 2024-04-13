from cube import config

config.base_path = '/cube-api'

def rewrite(query, ctx):
  query['measures'].append('orders.count')
  return query

config.query_rewrite = rewrite
