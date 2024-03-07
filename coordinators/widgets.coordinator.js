import { v4 as uuid } from 'uuid';
import WidgetsModel from '../models/widgets.model.js';

export default class WidgetsCoordinator {
  static getWidgets = () => {
    console.log('\t Coordinator : getWidgets()');
    return WidgetsModel.getWidgets();
  };

  static createWidget = (newWidget) => {
    console.log('\t Coordinator : createWidget()');

    const widget = {
      ...newWidget,
      id: uuid(),
    };

    return WidgetsModel.createWidget(widget);
  };
}
