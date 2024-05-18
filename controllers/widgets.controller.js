import { rename } from 'fs/promises';
import WidgetsCoordinator from '../coordinators/widgets.coordinator.js';

/**
 * getWidgets - Return a list of widgets.
 * @async
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 * @param {Function} next - Express "next" middleware function
 */
export const getWidgets = async (req, res, next) => {
  console.log('Controller : getWidgets()');

  try {
    const result = await WidgetsCoordinator.getWidgets();
    res.status(200).json(result);
  } catch (ex) {
    next(ex);
  }
};

export const createWidget = async (req, res, next) => {
  console.log('Controller : createWidget()');

  try {
    const result = await WidgetsCoordinator.createWidget(req.body);
    res.status(201).json(result);
  } catch (ex) {
    next(ex);
  }
};

export const getWidget = async (req, res, next) => {
  console.log(`Controller : getWidget(${req.params.id})`);

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
  console.log(`Controller : deleteWidget(${req.params.id})`);

  try {
    await WidgetsCoordinator.deleteWidget(req.params.id);
    res.status(204).json();
  } catch (ex) {
    next(ex);
  }
};

export const replaceWidget = async (req, res, next) => {
  console.log(`Controller : replaceWidget(${req.params.id})`);

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
  console.log(`Controller : updateWidget(${req.params.id})`);

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
  console.log(`Controller : uploadImage(${req.params.id})`);

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
