# Databricks notebook source
from cube import config
 
@config('semantic_layer_sync')
def semantic_layer_sync(ctx: dict) -> list[dict]:
  return [
    {
      'type': 'superset',
      'name': 'Superset Sync',
      'config': {
        'user': 'admin',
        'password': 'leverta33',
        'url': 'superset.yukontaf.com',
        'database': 'Cube Cloud: production-deployment'
      }
    }
  ]