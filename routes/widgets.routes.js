import express from 'express';
import multer from 'multer';
import {
  getWidgets,
  createWidget,
  getWidget,
  replaceWidget,
  deleteWidget,
  updateWidget,
  uploadImage,
} from '../controllers/widgets.controller.js';
import readWriteAuth from '../middleware/readWriteAuth.js';

const widgetsRouter = express.Router();

// GET /api/v1/widgets
widgetsRouter.get('/', getWidgets);

// POST /api/v1/widgets
widgetsRouter.post('/', [readWriteAuth()], createWidget);

// GET /api/v1/widgets/<id>
widgetsRouter.get('/:id', getWidget);

// PUT /api/v1/widgets/<id>
widgetsRouter.put('/:id', [readWriteAuth()], replaceWidget);

// DELETE /api/v1/widgets/<id>
widgetsRouter.delete('/:id', [readWriteAuth()], deleteWidget);

// PATCH /api/v1/widgets/<id>
widgetsRouter.patch('/:id', [readWriteAuth()], updateWidget);

const uploader = multer({
  dest: './static/widgets/image-uploads/',
  limits: {
    fileSize: 5_000_000, // 5MB
  },
});
// POST /api/v1/widgets/<id>/images
widgetsRouter.post('/:id/images', uploader.single('widgetImage'), uploadImage);

export default widgetsRouter;
