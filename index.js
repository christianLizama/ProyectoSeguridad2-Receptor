const express = require("express");

const bodyParser = require("body-parser");

const fs = require("fs");

const path = require("path");

const app = express();

const port = 80;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hola desde servidor receptor");
});

app.post("/log", (req, res) => {
  const { encrypted_log, system_info } = req.body;

  if (!encrypted_log || !system_info) {
    return res.status(400).send("Missing data");
  }

  // Generar un nombre de archivo único usando un timestamp

  const timestamp = new Date().toISOString().replace(/:/g, "-");

  const logFileName = `log_${timestamp}.txt`;

  const logData = `System Info: ${system_info}\nEncrypted Log: ${encrypted_log}\n\n`;

  fs.writeFile(path.join(__dirname, logFileName), logData, (err) => {
    if (err) {
      return res.status(500).send("Server error");
    }

    res.send("Log received");
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
