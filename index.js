import express from 'express';
import bodyParser from 'body-parser';
import colorCheckerMiddleware from './middleware/widgetColorChecker.js';
import errorMiddleware from './middleware/errorHandler.js';
import widgetsRouter from './routes/widgets.routes.js';

const { json } = bodyParser;

// This is my express application
const app = express();
const port = 3000;
app.use(json());

app.post('/api/v1/widgets', colorCheckerMiddleware());
app.patch('/api/v1/widgets/:id', colorCheckerMiddleware());
app.put('/api/v1/widgets/:id', colorCheckerMiddleware());

app.use('/api/v1/widgets', widgetsRouter);

// Error middleware MUST be last
app.use(errorMiddleware());

app.listen(port, () => {
  console.log(`Starting express application on port ${port}`);
});
