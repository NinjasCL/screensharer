const express = require("express");
const screenshot = require("screenshot-desktop");

const takeScreenshot = async (filename = "public/screenshot.jpg") => {
  return screenshot({ filename });
};

const takeScreenshotWithTimer = async (ms = 1000) => {
  setInterval(() => {
    takeScreenshot();
  }, ms);
};

const main = async () => {
  // Ensure at least one screenshot is present
  takeScreenshot();
  const interval = 15 * 1000;
  takeScreenshotWithTimer(interval);

  const app = express();
  app.use("/assets", express.static("public"));
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  console.log("Starting Server");
  app.listen(3000);
};

main();
