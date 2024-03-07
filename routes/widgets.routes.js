import express from 'express';
import { getWidgets, createWidget, getWidget, replaceWidget, deleteWidget, updateWidget } from '../controllers/widgets.controller.js';

const widgetsRouter = express.Router();

// GET /api/v1/widgets
widgetsRouter.get('/', getWidgets);

// POST /api/v1/widgets
widgetsRouter.post('/', createWidget);

// GET /api/v1/widgets/<id>
widgetsRouter.get('/:id', getWidget);

// PUT /api/v1/widgets/<id>
widgetsRouter.put('/:id', replaceWidget);

// DELETE /api/v1/widgets/<id>
widgetsRouter.delete('/:id', deleteWidget);

// PATCH /api/v1/widgets
widgetsRouter.patch('/:id', updateWidget);

export default widgetsRouter;