const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } =
  require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } =
  require("@badeball/cypress-cucumber-preprocessor/esbuild");

const { queryDB } = require("./cypress/support/db");
const fs = require("fs");
const path = require("path");
const { createClient } = require("webdav");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: process.env.DOCKER === "true"
      ? "http://mantisbt:80"
      : "http://localhost:8989",
    downloadsFolder: process.env.DOCKER === "true"
      ? "/shared_webdav/Downloads"
      : "cypress/downloads",
    video: true,

    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      embeddedScreenshots: true,
    },
    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      config.env.DOCKER = process.env.DOCKER || "false";
      console.log(">>> DOCKER:", config.env.DOCKER);

      // Cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Chrome/Edge no modo headed/headless
          launchOptions.args.push('--lang=pt-BR');
          return launchOptions;
        }
        if (browser.name === 'electron') {
          // Electron headless
          launchOptions.preferences.lang = 'pt-BR';
          return launchOptions;
        }
      });

      // Tasks
      on("task", {
        queryDb: (query) => queryDB(query),

        queryFromFile({ fileName, replacements }) {
          const filePath = path.join(__dirname, "cypress", "sql", fileName);
          let sql = fs.readFileSync(filePath, "utf8");

          if (replacements) {
            for (const [key, value] of Object.entries(replacements)) {
              sql = sql.replace(new RegExp(`\\$${key}`, "g"), value);
            }
          }

          return queryDB(sql);
        },
        async deleteFile({ fileName, local = false }) {
          const isDocker = config.env.DOCKER === "true";
          const folder = local || !isDocker
            ? path.resolve("cypress/downloads")
            : "/shared_webdav/Downloads";
          const filePath = path.join(folder, fileName);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return { deleted: true, path: filePath };
          }

          return { deleted: false, reason: "not found", path: filePath };
        },

        async listWebdavFiles(dir = "/Downloads") {
          try {
            const client = createClient("http://webdav:80/data", {
              username: "TESTE_AUTOMATIZADO",
              password: "AUTOTESTE",
            });

            const contents = await client.getDirectoryContents(dir);
            return contents.map((f) => path.basename(f.filename));
          } catch (err) {
            console.error("Erro listando arquivos no WebDAV:", err.message);
            return [];
          }
        },
        log(message) {
          console.log("📝 [CYPRESS LOG]:", message);
          return null;
        },
        copyFromWebdav({ source, target }) {
          const dest = path.join('cypress/fixtures', target);
          fs.copyFileSync(source, dest);
          return null;
        }

      });

      return config;
    },
  },
});
