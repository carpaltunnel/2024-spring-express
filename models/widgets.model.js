const widgets = [
  {
    id: 1,
    name: 'Widget #1',
    color: 'blue',
  },
];

export default class WidgetsModel {
  static getWidgets = () => {
    console.log('\t\t Model : getWidgets()');
    return widgets;
  };

  static createWidget = (newWidget) => {
    console.log('\t\t Model : getWidgets()');
    widgets.push(newWidget);
    return newWidget;
  };
}
