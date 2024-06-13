import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import colorCheckerMiddleware from './middleware/widgetColorChecker.js';
import errorMiddleware from './middleware/errorHandler.js';
import authMiddleware from './middleware/auth.js';
import widgetsRouter from './routes/widgets.routes.js';
import { generateJwt } from './controllers/auth.controller.js';
import { db } from './lib/database.js';
import { healthcheck } from './controllers/healthcheck.js';

import multer from 'multer';

const { json } = bodyParser;

// This is my express application
const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(express.static('static'));

app.get('/api/v1/healthcheck', healthcheck);

app.post('/api/v1/widgets', colorCheckerMiddleware());
app.patch('/api/v1/widgets/:id', colorCheckerMiddleware());
app.put('/api/v1/widgets/:id', colorCheckerMiddleware());

app.use('/api/v1/widgets', [authMiddleware()], widgetsRouter);

// Generate JWT Route
app.post('/api/v1/auth', generateJwt);

// Error middleware MUST be last
app.use(errorMiddleware());

// TODO: Environment based configs
const mongoConfig = config.get('mongo');
db.init(mongoConfig);

app.listen(port, () => {
  console.log(`Starting express application on port ${port} @ ${new Date().toISOString()}`);
});
