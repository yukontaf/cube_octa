from cube_dbt import Dbt

from cube import TemplateContext

url = 'https://raw.githubusercontent.com/yukontaf/cube_octa/main/manifest.json'

dbt = (
  Dbt
  .from_url(url)
)

template = TemplateContext()

@template.function('dbt_models')
def dbt_models():
  return dbt.models


@template.function('dbt_model')
def dbt_model(name):
  model = dbt.model(name)
  return model

