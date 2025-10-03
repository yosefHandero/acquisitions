import express from 'express';
import logger from "#config/logger.js";
import morgan from "morgan";
import cors from 'cors';
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRoutes from "#routes/auth.routes.js";
import securityMiddleware from "#middleware/security.middleware.js"
import usersRoutes from "#routes/users.routes.js";
import apiRouter from '#routes/api.route.js';
const app = express();
app.use('/api', apiRouter);
const isProd = process.env.NODE_ENV === "production";

app.use(
    helmet({
        // keep other helmet defaults
        hsts: isProd ? undefined : false,  // <-- no HSTS in dev
    })
);

// If you have a "force https" redirect, guard it:
if (isProd) {
    app.use((req, res, next) => {
        if (req.protocol !== "https") {
            return res.redirect(`https://${req.headers.host}${req.url}`);
        }
        next();
    });
}
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    morgan('combined', {
      stream: { write: message => logger.info(message.trim()) },
    })
    
);
app.use(securityMiddleware)
app.get('/', (req, res) => {
  logger.info("Hello from Acquisitions");
  res.status(200).send('Hello from acquisitions api');
});
app.get('/health', (req, res) => {
    res
        .status(200)
        .json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        });
});
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Acquisitions API is running!' });
});
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes);
export default app;
