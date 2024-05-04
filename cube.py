from cube import config

@config('semantic_layer_sync')
def semantic_layer_sync(ctx: dict) -> list[dict]:
  return [
    {
      'type': 'preset',
      'name': "Preset Sync",
      'config': {
        'api_token': 'f54ffebf-41bb-426b-906b-c6330ac66694',
        'api_secret': '952ef86a3b549084a637831c2d3612e134ce0275260dfd7c9fcf99cecf6ea897',
        'workspace_url': '20572de6.us1a.app.preset.io',
        'database': 'Cube Cloud'
      }
    }
  ]
  
