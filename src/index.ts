import express from "express";
import Consul from "consul";

const app = express();
const consul = new Consul();

app.get("/health", (req, res) => {
  res.send("ok");
});

app.listen(3000, async () => {
  try {
    await consul.agent.service.register("test-service");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
