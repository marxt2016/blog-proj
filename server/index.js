import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/api/posts", postRoutes);
app.use("/user", userRoutes);

// app.get("/", (req, res) => {
//   res.send("server is up");
// });

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));
  const indexPath = path.join(__dirname, "client", "index.html");

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)))
  .catch((error) => console.log(error.message));
