import { defineConfig } from "cypress";

export default defineConfig({
  proxyServer: "http://localhost:5173/",
  env: {
    baseUrl: "http://localhost:5173/",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/test/*.js",
    screenshotsFolder: "cypress/screenshots",
  },
});
