# Databricks notebook source
from cube_dbt import Dbt

from cube import TemplateContext

url = 'https://raw.githubusercontent.com/yukontaf/dbt_octafx/main/target/manifest.json'

dbt = (
  Dbt
  .from_url(url)
  .filter(paths=['funnels/'])
)



template = TemplateContext()

@template.function('dbt_models')
def dbt_models():
  return dbt.models


@template.function('dbt_model')
def dbt_model(name):
  model = dbt.model(name)
  return model
