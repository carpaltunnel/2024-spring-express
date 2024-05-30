import assert from 'assert/strict';
import axios from 'axios';
import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import { expect } from 'chai';
import { db } from '../../lib/database.js';
import widgetsRouter from '../../routes/widgets.routes.js';

describe('Widgets', () => {
  const url = 'http://127.0.0.1:3001/api/v1/widgets';
  let server;

  before(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use('/api/v1/widgets', widgetsRouter);
    server = app.listen(3001, () => {
      console.log(`Starting express application on port 3001 @ ${new Date().toISOString()}`);
    });

    const mongoConfig = config.get('mongo');
    await db.init(mongoConfig);
  });

  after(async () => {
    await db.disconnect();
    server.close();
  });

  describe('getWidgets', () => {
    it('should return an array of widgets', async () => {
      const result = (await axios.get(url)).data;
      expect(result).to.be.an('array');
      
      // TODO: Update with Mocks
      expect(result).to.have.lengthOf(10);
    });

    it('should return false', () => {
      assert(true === true);
    });
  });
});
