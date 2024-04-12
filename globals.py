from cube import TemplateContext
from cube_dbt import Dbt

dbt = Dbt.from_file('./manifest.json')

template = TemplateContext()

@template.function('dbt_models')
def dbt_models():
  return dbt.models

@template.function('dbt_model')
def dbt_model(name):
  return dbt.model(name)
