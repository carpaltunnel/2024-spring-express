import WidgetsModel from '../models/widgets.model.js';

export default class WidgetsCoordinator {
    static getWidgets = () => {
        console.log('\t Coordinator : getWidgets()');

        return WidgetsModel.getWidgets();
    }

    static createWidget = (newWidget) => {
        console.log('\t Coordinator : createWidget()');

        // TODO: Generate unique id for new widget

        return WidgetsModel.createWidget(newWidget);
    }
}