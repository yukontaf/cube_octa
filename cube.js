import cube from "@cubejs-client/core";

const cubeApi = cube(async () => await Auth.getJwtToken(), {
  apiUrl: "http://localhost:4000/cubejs-api/v1",
});

module.exports = {
  semanticLayerSync: ({ securityContext }) => {
    return [
      {
        type: "preset",
        name: "Preset Sync",
        config: {
          api_token: "f54ffebf-41bb-426b-906b-c6330ac66694",
          api_secret:
            "952ef86a3b549084a637831c2d3612e134ce0275260dfd7c9fcf99cecf6ea897",
          workspace_url: "20572de6.us1a.app.preset.io",
          database: "Cube Cloud: production-deployment",
        },
      },
    ];
  },
};
