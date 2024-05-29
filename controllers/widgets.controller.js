import { rename } from 'fs/promises';
import WidgetsCoordinator from '../coordinators/widgets.coordinator.js';
import logger from '../lib/logger.js';

/**
 * getWidgets - Return a list of widgets.
 * @async
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 * @param {Function} next - Express "next" middleware function
 */
export const getWidgets = async (req, res, next) => {
  logger.info('Calling controller.getWidgets', {
    location: 'controller',
    function: 'getWidgets',
    method: 'GET',
  });
  const sortDirection = req.query?.sortDirection?.toLowerCase() === 'desc' ? -1 : 1;

  try {
    const result = await WidgetsCoordinator.getWidgets(sortDirection);
    res.status(200).json(result);
  } catch (ex) {
    next(ex);
  }
};

export const createWidget = async (req, res, next) => {
  logger.info({
    location: 'controller',
    function: 'createWidget',
    method: 'POST',
  });

  try {
    const result = await WidgetsCoordinator.createWidget(req.body);
    res.status(201).json(result);
  } catch (ex) {
    next(ex);
  }
};

export const getWidget = async (req, res, next) => {
  logger.info({
    location: 'controller',
    function: 'getWidget',
    method: 'GET',
    id: req.params.id,
  });

  try {
    const result = await WidgetsCoordinator.getWidget(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};

export const deleteWidget = async (req, res, next) => {
  logger.info({
    location: 'controller',
    function: 'deleteWidget',
    method: 'DELETE',
    id: req.params.id,
  });

  try {
    await WidgetsCoordinator.deleteWidget(req.params.id);
    res.status(204).json();
  } catch (ex) {
    next(ex);
  }
};

export const replaceWidget = async (req, res, next) => {
  logger.info({
    location: 'controller',
    function: 'replaceWidget',
    method: 'PUT',
    id: req.params.id,
  });

  try {
    const result = await WidgetsCoordinator.replaceWidget(req.params.id, req.body);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};

export const updateWidget = async (req, res, next) => {
  logger.info({
    location: 'controller',
    function: 'updateWidget',
    method: 'PATCH',
    id: req.params.id,
  });

  try {
    const result = await WidgetsCoordinator.updateWidget(req.params.id, req.body);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};

export const uploadImage = async (req, res, next) => {
  logger.info({
    location: 'controller',
    function: 'uploadImage',
    method: 'POST',
    id: req.params.id,
  });

  if (!req.file) {
    res.sendStatus(400);
  }

  if (req.file.mimetype.indexOf('image') < 0) {
    res.sendStatus(400);
  }

  try {
    const newFilename = `${req.file.destination}${req.file.originalname}`;
    await rename(req.file.path, newFilename);

    const result = await WidgetsCoordinator.addImageToWidget(req.params.id, newFilename);

    if (result) {
      res.status(204).json();
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};
