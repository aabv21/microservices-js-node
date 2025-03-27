import { spawn } from "child_process";
import { setTimeout } from "timers/promises";

export default async () => {
  const serverProcess = spawn("node", ["app.js"]);
  global.__SERVER_PID = serverProcess.pid;

  serverProcess.stdout.on("data", (data) => {
    console.log(`Server stdout: ${data}`);
  });
  serverProcess.stderr.on("data", (data) => {
    console.error(`Server stderr: ${data}`);
  });

  console.info(`Server PID: ${serverProcess.pid}`);
  await setTimeout(4000);
};
