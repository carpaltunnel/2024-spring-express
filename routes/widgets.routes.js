import express from 'express';
import { getWidgets, createWidget } from '../controllers/widgets.controller.js';

const widgetsRouter = express.Router();

// GET /api/v1/widgets
widgetsRouter.get('/', getWidgets);

// POST /api/v1/widgets
widgetsRouter.post('/', createWidget);

export default widgetsRouter;