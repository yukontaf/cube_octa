# Databricks notebook source
from cube_dbt import Dbt

from cube import TemplateContext

url = 'https://www.dropbox.com/scl/fi/x411upkqfx2kj73ylevzx/manifest.json?rlkey=jq55ehjoyc67i1yc1qldc7dfw&dl=1'

dbt = Dbt.from_url(url)

template = TemplateContext()

@template.function('dbt_models')
def dbt_models():
  return dbt.models


@template.function('dbt_model')
def dbt_model(name):
  model = dbt.model(name)
  return model