import express from 'express';

// This is my express application
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Starting express application on port ${port}`);
});
