# Databricks notebook source
from cube_dbt import Dbt

from cube import TemplateContext

url = 'https://www.dropbox.com/scl/fi/ymjilw010gyln1pijfh9i/manifest.json?rlkey=733hp3omgim6ovmj1ak9f9wun&dl=1'

dbt = Dbt.from_url(url)

template = TemplateContext()

@template.function('dbt_models')
def dbt_models():
  return dbt.models


@template.function('dbt_model')
def dbt_model(name):
  model = dbt.model(name)
  return model