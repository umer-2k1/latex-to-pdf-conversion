import express from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import crypto from "crypto";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.text({ limit: "5mb" }));

const PORT = 3000;

app.get("/health-check", async (req, res) => {
  try {
    return res.status(200).json({ data: "API success" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in health check API.");
  }
});

app.post("/compile-latex", async (req, res) => {
  const resume = req.body;

  if (!resume) {
    return res
      .status(400)
      .send("Request body must include 'resume' field with LaTeX content.");
  }

  const outputDir = path.join(__dirname, "output");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  const id = crypto.randomBytes(6).toString("hex");
  const texFile = path.join(outputDir, `${id}.tex`);
  const pdfFile = path.join(outputDir, `${id}.pdf`);
  // const texFile = path.join(__dirname, "resume_01.tex"); // <-- your LaTeX file

  try {
    fs.writeFileSync(texFile, resume);
    const pdflatexPath = `"C:\\Users\\lenovo\\AppData\\Local\\Programs\\MiKTeX\\miktex\\bin\\x64\\pdflatex.exe"`;

    // Compile LaTeX to PDF
    await new Promise((resolve, reject) => {
      exec(
        `${pdflatexPath} -interaction=nonstopmode -output-directory="${outputDir}" "${texFile}"`,
        (error, stdout, stderr) => {
          console.log("pdflatex stdout:\n", stdout);
          console.log("pdflatex stderr:\n", stderr);
          if (error) return reject(stderr || stdout || error);
          resolve(stdout);
        }
      );
    });
    if (!fs.existsSync(pdfFile)) {
      return res.status(500).send("PDF was not generated.");
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${id}.pdf`);
    res.send(fs.readFileSync(pdfFile));
    console.log(`PDF compiled successfully and saved to212: ${pdfFile}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to compile LaTeX. Check pdflatex output.");
  }
});

app.listen(PORT, () => {
  console.log(`LaTeX API server running at http://localhost:${PORT}`);
});
