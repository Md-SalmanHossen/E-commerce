import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import connectDb from "./src/configs/connectDB.config.js";
import router from "./src/routes/api.js";

dotenv.config();
connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

// security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "https:", "data:"],
        "script-src": ["'self'", "'unsafe-inline'", "https:"],
        "style-src": ["'self'", "'unsafe-inline'", "https:"],
      },
    },
  }),
);

// sanitize
app.use(hpp());

// body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
});
app.use(limiter);

// routes
app.use("/api/v1", router);

// static uploads
app.use("/api/v1/get-file", express.static(path.join(__dirname, "uploads")));

/*
// serve super-admin panel
app.use(
  "/super-admin",
  express.static(path.join(__dirname, "client", "super-admin", "dist"), {
    index: false,
  }),
);

// serve ecommerce frontend
app.use(express.static(path.join(__dirname, "client", "ecommerce", "dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "client", "ecommerce", "dist", "index.html"),
  );
});
*/

export default app;
