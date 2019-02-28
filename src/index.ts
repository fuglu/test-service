import bunyan from "bunyan";
import express from "express";

const logger = bunyan.createLogger({ name: "test-service:app" });

logger.info("Starting up");

const app = express();

app.get("/", (req, res) => {
  res.send({ time: Date.now() });
});

app.get("/health", (req, res) => {
  res.send({ health: true });
});

logger.info("Starting server");
const server = app.listen(3000, () => {
  logger.info("Listening on port 3000");
});

const shutdown = (signal: NodeJS.Signals) => {
  logger.info(`Catched ${signal}`);
  logger.info("Closing server");
  server.close(() => {
    logger.info("Closed server");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
