import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';
import logger from '../lib/logger.js';

export default class WidgetsModel {
  /**
   * getWidgets - return a list of widgets from the database
   * @returns {Array} - An array of widget objects.
   */
  static getWidgets = async (sortDirection) => {
    logger.info({
      location: 'model',
      function: 'getWidgets',
    });

    return db.dbWidgets().find(
      {},
      {
        sort: { name: sortDirection },
        projection: Constants.DEFAULT_PROJECTION,
      },
    ).toArray();
  };

  /**
   * createWidget - Insert a new widget object into database
   * @param {Object} newWidget - The new widget to create in the database
   * @returns {Object} - The created widget.
   */
  static createWidget = async (newWidget) => {
    logger.info({
      location: 'model',
      function: 'createWidget',
    });
    await db.dbWidgets().insertOne(newWidget);

    const returnWidget = { ...newWidget };
    // eslint-disable-next-line no-underscore-dangle
    delete returnWidget._id;
    return returnWidget;
  };

  static getWidget = (id) => {
    logger.info({
      location: 'model',
      function: 'getWidget',
      id,
    });
    return db.dbWidgets().findOne({ id }, { projection: Constants.DEFAULT_PROJECTION });
  };

  static deleteWidget = (id) => {
    logger.info({
      location: 'model',
      function: 'deleteWidget',
      id,
    });

    return db.dbWidgets().deleteOne({ id });
  };

  static replaceWidget = async (id, widget) => {
    logger.info({
      location: 'model',
      function: 'replaceWidget',
      id,
    });
    const result = await db.dbWidgets().replaceOne({ id }, widget);

    if (result.matchedCount === 1) {
      return widget;
    }

    return false;
  };

  static updateWidget = async (id, widget) => {
    logger.info({
      location: 'model',
      function: 'updateWidget',
      id,
    });
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
    logger.info({
      location: 'model',
      function: 'addImageToWidget',
      id,
      imagePath,
    });
    const update = {
      $set: {
        imagePath,
      },
    };

    return db.dbWidgets().updateOne({ id }, update);
  };
}
