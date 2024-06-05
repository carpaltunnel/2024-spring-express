import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import colorCheckerMiddleware from './middleware/widgetColorChecker.js';
import errorMiddleware from './middleware/errorHandler.js';
import authMiddleware from './middleware/auth.js';
import widgetsRouter from './routes/widgets.routes.js';
import { db } from './lib/database.js';

import multer from 'multer';

const { json } = bodyParser;

// This is my express application
const app = express();
const port = 3000;

app.use(authMiddleware());

app.use(json());
app.use(express.static('static'));

app.post('/api/v1/widgets', colorCheckerMiddleware());
app.patch('/api/v1/widgets/:id', colorCheckerMiddleware());
app.put('/api/v1/widgets/:id', colorCheckerMiddleware());

app.use('/api/v1/widgets', widgetsRouter);

// Error middleware MUST be last
app.use(errorMiddleware());

// TODO: Environment based configs
const mongoConfig = config.get('mongo');
db.init(mongoConfig);

app.listen(port, () => {
  console.log(`Starting express application on port ${port} @ ${new Date().toISOString()}`);
});
