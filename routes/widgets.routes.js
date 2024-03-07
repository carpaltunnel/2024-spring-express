import express from 'express';
import { getWidgets } from '../controllers/widgets.controller.js';

const widgetsRouter = express.Router();

// GET /api/v1/widgets
widgetsRouter.get('/', getWidgets);

export default widgetsRouter;