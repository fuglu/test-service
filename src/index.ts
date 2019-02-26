import bunyan from "bunyan";
import Consul from "consul";
import express from "express";

const logger = bunyan.createLogger({ name: "test-service:app" });

logger.info("Starting up");

const app = express();
const consul = new Consul({ promisify: true });

app.get("/health", (req, res) => {
  res.send("ok");
});

logger.info("Starting server");
const server = app.listen(3000, async () => {
  logger.info("Listening on port 3000");
  try {
    logger.info("Registering service");
    await consul.agent.service.register({
      check: {
        http: "http://localhost:3000/health",
        interval: "2s"
      },
      name: "test-service",
      port: 3000
    });
    logger.info("Registered service");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
});

const shutdown = async () => {
  logger.info("Catched shutdown signal");
  try {
    logger.info("Deregistering service");
    await consul.agent.service.deregister("test-service");
    logger.info("Deregistered service");
  } catch (error) {
    logger.error(error);
  } finally {
    logger.info("Closing server");
    server.close(() => {
      logger.info("Closed server");
      process.exit(0);
    });
  }
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
