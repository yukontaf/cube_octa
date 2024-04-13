from cube import config

config.base_path = '/cube-api'

config.context_to_app_id = lambda ctx: ctx['securityContext']['tenant_id']

def rewrite(query, ctx):
  query['measures'].append('orders.count')
  return query

config.query_rewrite = rewrite

from cube import TemplateContext
from cube_dbt import Dbt

dbt = Dbt.from_file('manifest.json')

template = TemplateContext()

@template.function('dbt_models')
def dbt_models():
  return dbt.models

@template.function('dbt_model')
def dbt_model(name):
  return dbt.model(name)
