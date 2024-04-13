from cube_dbt import Dbt

url = 'https://raw.githubusercontent.com/yukontaf/cube_octa/main/manifest.json'

dbt = (
  Dbt
  .from_url(url)
  .filter(
    paths=['/model/cubes'],
    names=['event_stream']
  )
)
