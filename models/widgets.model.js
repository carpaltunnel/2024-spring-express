import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';

let widgets = [
  {
    id: '1',
    name: 'Widget #1',
    color: 'blue',
  },
];

export default class WidgetsModel {
  /**
   * getWidgets - return a list of widgets from the database
   * @returns {Array} - An array of widget objects.
   */
  static getWidgets = async () => {
    console.log('\t\t Model : getWidgets()');

    return db.dbWidgets().find(
      {},
      { projection: Constants.DEFAULT_PROJECTION },
    ).toArray();
  };

  /**
   * createWidget - Insert a new widget object into database
   * @param {Object} newWidget - The new widget to create in the database
   * @returns {Object} - The created widget.
   */
  static createWidget = async (newWidget) => {
    console.log('\t\t Model : createWidgets()');
    await db.dbWidgets().insertOne(newWidget);

    const returnWidget = { ...newWidget };
    // eslint-disable-next-line no-underscore-dangle
    delete returnWidget._id;
    return returnWidget;
  };

  static getWidget = (id) => {
    console.log('\t\t Model : getWidget()');
    return db.dbWidgets().findOne({ id }, { projection: Constants.DEFAULT_PROJECTION });
  };

  static deleteWidget = (id) => {
    console.log('\t\t Model : deleteWidget()');

    return db.dbWidgets().deleteOne({ id });
  };

  static replaceWidget = async (id, widget) => {
    const result = await db.dbWidgets().replaceOne({ id }, widget);

    if (result.matchedCount === 1) {
      return widget;
    }

    return false;
  };

  static updateWidget = async (id, widget) => {
    const update = {
      $set: {},
    };

    Object.keys(widget).forEach((key) => {
      if (key === 'id') {
        return;
      }

      update.$set[key] = widget[key];
    });

    const result = await db.dbWidgets().findOneAndUpdate({ id }, update, { returnDocument: 'after' });

    if (result) {
      delete result._id;
      return result;
    }

    return false;
  };

  static addImageToWidget = async (id, imagePath) => {
    const update = {
      $set: {
        imagePath,
      },
    };

    return db.dbWidgets().updateOne({ id }, update);
  };
}
