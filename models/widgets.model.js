const widgets = [
    {
        id: 1,
        name: 'Widget #1',
        color: 'blue'
    }
];

export default class WidgetsModel {
    static getWidgets = () => {
        return widgets;   
    }

    static createWidget = (newWidget) => {
        widgets.push(newWidget);
        return newWidget;   
    }
}