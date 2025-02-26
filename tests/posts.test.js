import { spawn } from "child_process";
import { setTimeout } from "timers/promises";

let serverProcess;

beforeAll(async () => {
  serverProcess = spawn("node", ["app.js"]);

  serverProcess.stdout.on("data", (data) => {
    console.log(`Server output: ${data}`);
  });

  await setTimeout(5000);
});

afterAll(async () => {
  serverProcess.kill();
  console.info("Server process killed");
});
