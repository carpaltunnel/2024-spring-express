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

  const result = WidgetsCoordinator.getWidgets();

  res.status(200).json(result);
};

export const createWidget = async (req, res, next) => {
  console.log('Controller : createWidget()');

  try {
    const result = WidgetsCoordinator.createWidget(req.body);
    res.status(201).json(result);
  } catch (ex) {
    next(ex);
  }
};

export const getWidget = async (req, res, next) => {
  console.log(`Controller : getWidget(${req.params.id})`);

  const result = WidgetsCoordinator.getWidget(req.params.id);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json();
  }
};

export const deleteWidget = async (req, res, next) => {
  console.log(`Controller : deleteWidget(${req.params.id})`);

  const result = WidgetsCoordinator.deleteWidget(req.params.id);

  if (result) {
    res.status(204).json();
  } else {
    res.status(404).json();
  }
};

export const replaceWidget = async (req, res, next) => {
  console.log(`Controller : replaceWidget(${req.params.id})`);

  const result = WidgetsCoordinator.replaceWidget(req.params.id, req.body);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json();
  }
};

export const updateWidget = async (req, res, next) => {
  console.log(`Controller : updateWidget(${req.params.id})`);

  const result = WidgetsCoordinator.updateWidget(req.params.id, req.body);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json();
  }
};
