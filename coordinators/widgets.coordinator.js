import { v4 as uuid } from 'uuid';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import logger from '../lib/logger.js';
import WidgetsModel from '../models/widgets.model.js';
import widgetSchema from '../schemas/widget.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(widgetSchema);


export default class WidgetsCoordinator {
  /**
   *  testing
   */
  static getWidgets = (sortDirection) => {
    logger.debug('getWidgets', {
      location: 'coordinator',
      function: 'getWidgets',
    });
    return WidgetsModel.getWidgets(sortDirection);
  };

  /**
   * test
   * @param {*} newWidget 
   * @returns newWidget
   * @todo make this better.
   */
  static createWidget = (newWidget) => {
    logger.debug({
      location: 'coordinator',
      function: 'createWidget',
    });

    const widget = {
      ...newWidget,
      id: uuid(),
    };

    const valid = validate(widget);
    if (!valid) {
      throw validate.errors;
    }

    return WidgetsModel.createWidget(widget);
  };

  static getWidget = (id) => {
    logger.debug({
      location: 'coordinator',
      function: 'getWidget',
      id,
    });
    return WidgetsModel.getWidget(id);
  };

  static deleteWidget = (id) => {
    logger.info({
      location: 'coordinator',
      function: 'deleteWidget',
      id,
    });
    return WidgetsModel.deleteWidget(id);
  };

  static replaceWidget = (id, widget) => {
    logger.debug({
      location: 'coordinator',
      function: 'replaceWidget',
      id,
    });

    const replaceWidget = {
      ...widget,
      id,
    };
    const valid = validate(widget);
    if (!valid) {
      throw validate.errors;
    }

    return WidgetsModel.replaceWidget(id, replaceWidget);
  };

  static updateWidget = (id, widget) => {
    logger.debug({
      location: 'coordinator',
      function: 'updateWidget',
      id,
    });

    const updateWidget = {
      ...widget,
      id,
    };

    const valid = validate(updateWidget);
    if (!valid) {
      throw validate.errors;
    }

    return WidgetsModel.updateWidget(id, updateWidget);
  };

  static addImageToWidget = (id, imagePath) => {
    logger.debug({
      location: 'coordinator',
      function: 'addImageToWidget',
      imagePath,
      id,
    });
    return WidgetsModel.addImageToWidget(id, imagePath);
  };
}
