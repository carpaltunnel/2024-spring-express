import express from 'express';
import widgetsRouter from './routes/widgets.routes.js';

// This is my express application
const app = express();
const port = 3000;

app.use('/api/v1/widgets', widgetsRouter);

app.listen(port, () => {
    console.log(`Starting express application on port ${port}`);
});
