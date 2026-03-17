import express from "express";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectDb } from "./src/configs/connectDB.config";

dotenv.config();
connectDb();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5173"],
    credentials: true,
  }),
);

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https:", "data:"],
    },
  }),
);

app.use(mongoSanitize);
app.use(hpp());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}));

const limiter=rateLimiter({
   windowMs:15*60*1000,
   max:3000
});
app.use(limiter);


export default app;


