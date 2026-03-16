import express from 'express';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp';
import cors from 'cors';
import path from 'path'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

