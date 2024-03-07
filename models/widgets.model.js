let widgets = [
  {
    id: '1',
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

  static getWidget = (id) => {
    console.log('\t\t Model : getWidget()');

    const widget = widgets.find((w) => (w.id === id));
    return widget;
  };

  static deleteWidget = (id) => {
    console.log('\t\t Model : deleteWidget()');

    widgets = widgets.filter((w) => (w.id !== id));

    return true;
  };
}
