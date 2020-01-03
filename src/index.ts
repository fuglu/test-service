import { createTerminus } from "@godaddy/terminus";
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

createTerminus(server);
