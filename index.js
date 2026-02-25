/**
 * @author NTKhang
 * ! The source code is written by NTKhang, please don't change the author's name everywhere.
 * ! Official source code: https://github.com/ntkhang03/Goat-Bot-V2
 * ! If you do not download the source code from the above address, you are using an unknown version and at risk of having your account hacked
 */

const { spawn } = require("child_process");
const log = require("./logger/log.js");
const express = require("express");
const app = express();

// 🌐 Render web server (always alive)
app.get("/", (req, res) => {
  res.send("🚀 Siyuu's Goat Bot is ONLINE and ready!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("🌟 Web service running on port:", process.env.PORT || 3000);
});

// ⚡ Goat Bot auto-restart controller
let crashCount = 0;
const maxCrashes = 5;
const restartDelay = 2000; // 2 seconds delay for super-fast restart

function startProject() {
  const child = spawn("node", ["Goat.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  log.info("🔥 Goat.js launched! Let’s goooo!");

  child.on("close", (code) => {
    crashCount++;
    if (crashCount > maxCrashes) {
      log.error(`💥 Goat.js crashed ${crashCount} times. Manual check needed!`);
      return;
    }
    log.warn(`⚠️ Goat.js exited with code ${code}. Restarting in ${restartDelay / 1000}s... (${crashCount}/${maxCrashes})`);
    setTimeout(() => startProject(), restartDelay);
  });

  child.on("error", (err) => {
    log.error("❌ Failed to start Goat.js:", err);
  });
}

// 🧠 Memory monitor (auto-restart if too high)
setInterval(() => {
  const used = process.memoryUsage().rss / 1024 / 1024; // MB
  if (used > 300) {
    log.warn(`💾 Memory high: ${used.toFixed(2)}MB — restarting for safety...`);
    process.exit(1);
  }
}, 60000); // check every 60s

// 🛑 Graceful shutdown signals
process.on("SIGINT", () => {
  log.info("🛑 SIGINT received — shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  log.info("🛑 SIGTERM received — shutting down gracefully...");
  process.exit(0);
});

// 🚀 Start Goat Bot now!
startProject();
