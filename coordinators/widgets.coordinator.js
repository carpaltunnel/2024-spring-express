import { v4 as uuid } from 'uuid';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import WidgetsModel from '../models/widgets.model.js';
import widgetSchema from '../schemas/widget.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(widgetSchema);


export default class WidgetsCoordinator {
  /**
   *  testing
   */
  static getWidgets = () => {
    console.log('\t Coordinator : getWidgets()');
    return WidgetsModel.getWidgets();
  };

  /**
   * test
   * @param {*} newWidget 
   * @returns newWidget
   * @todo make this better.
   */
  static createWidget = (newWidget) => {
    console.log('\t Coordinator : createWidget()');

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
    console.log('\t Coordinator : getWidget()');
    return WidgetsModel.getWidget(id);
  };

  static deleteWidget = (id) => {
    console.log('\t Coordinator : deleteWidget()');
    return WidgetsModel.deleteWidget(id);
  };

  static replaceWidget = (id, widget) => {
    console.log('\t Coordinator : replaceWidget()');
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
    console.log('\t Coordinator : updateWidget()');

    const valid = validate(widget);
    if (!valid) {
      throw validate.errors;
    }

    return WidgetsModel.updateWidget(id, widget);
  };

  static addImageToWidget = (id, imagePath) => {
    return WidgetsModel.addImageToWidget(id, imagePath);
  };
}
