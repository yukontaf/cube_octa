import cube from '@cubejs-client/core';
const cubeApi = cube(
  async () => await Auth.getJwtToken(),
  { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
);