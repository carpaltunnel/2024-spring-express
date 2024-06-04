import axios from 'axios';
import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import { expect } from 'chai';
import { db } from '../../lib/database.js';
import widgetsRouter from '../../routes/widgets.routes.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { widgetsData } from './test-data/widgets-data.js';
import errorMiddleware from '../../middleware/errorHandler.js';

describe('Widgets', () => {
  const url = 'http://127.0.0.1:3001/api/v1/widgets';
  let server;
  let mongod;

  before(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use('/api/v1/widgets', widgetsRouter);
    app.use(errorMiddleware());
    server = app.listen(3001, () => {
      console.log(`Starting express application on port 3001 @ ${new Date().toISOString()}`);
    });

    const mongoConfig = config.get('mongo');
    mongod = new MongoMemoryServer({
      instance: {
        port: 27018,
        dbName: mongoConfig.database,
      },
    });
    await mongod.start();
    await db.init(mongoConfig);
  });

  beforeEach(async () => {
    await db.dbWidgets().insertMany(widgetsData);
  });

  afterEach(async () => {
    await db.dbWidgets().deleteMany({});
  });

  after(async () => {
    await db.disconnect();
    await mongod.stop();
    server.close();
  });

  describe('getWidgets', () => {
    it('should return an array of widgets', async () => {
      const result = (await axios.get(url)).data;
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(3);
    });

    it('should a single widget by id', async () => {
      const result = (await axios.get(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`)).data;
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('weight');
      expect(result).to.have.property('color');

      expect(result.name).to.equal('Widget #1');
      expect(result.color).to.equal('blue');
      expect(result.weight).to.equal(1);
    });

    it('should create a new widget', async () => {
      const newWidget = {
        name: 'Widget-Test',
        weight: 10,
        color: 'blue',
      };

      const result = (await axios.post(url, newWidget)).data;
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('weight');
      expect(result).to.have.property('color');

      expect(result.name).to.equal('Widget-Test');
      expect(result.color).to.equal('blue');
      expect(result.weight).to.equal(10);

      const getResult = (await axios.get(`${url}/${result.id}`)).data;
      expect(getResult).to.be.an('object');
      expect(getResult).to.have.property('id');
      expect(getResult).to.have.property('name');
      expect(getResult).to.have.property('weight');
      expect(getResult).to.have.property('color');

      expect(getResult.id).to.equal(result.id);
      expect(getResult.name).to.equal('Widget-Test');
      expect(getResult.color).to.equal('blue');
      expect(getResult.weight).to.equal(10);
    });

    it('should update a single widget by id', async () => {
      const updateData = {
        name: 'Widget-UPDATED',
        color: 'red',
        weight: 20,
      };
      const result = (await axios.patch(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`, updateData)).data;
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('weight');
      expect(result).to.have.property('color');

      expect(result.id).to.equal('49b73c5f-9007-4828-a0cd-da38aacc1219');
      expect(result.name).to.equal('Widget-UPDATED');
      expect(result.color).to.equal('red');
      expect(result.weight).to.equal(20);

      const getResult = (await axios.get(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`)).data;
      expect(getResult).to.be.an('object');
      expect(getResult).to.have.property('id');
      expect(getResult).to.have.property('name');
      expect(getResult).to.have.property('weight');
      expect(getResult).to.have.property('color');

      expect(getResult.id).to.equal('49b73c5f-9007-4828-a0cd-da38aacc1219');
      expect(getResult.name).to.equal('Widget-UPDATED');
      expect(getResult.color).to.equal('red');
      expect(getResult.weight).to.equal(20);
    });

    it('should delete a single widget by id', async () => {
      const result = (await axios.delete(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`));
      expect(result.status).to.equal(204);

      try {
        (await axios.get(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`));
      } catch (ex) {
        expect(ex.response.status).to.equal(404);
      }
    });

    it('should fail validation when updating a single widget by id', async () => {
      const updateData = {
        color: 'purple',
        weight: 20,
      };

      try {
        (await axios.patch(`${url}/49b73c5f-9007-4828-a0cd-da38aacc1219`, updateData));
      } catch (ex) {
        expect(ex.response.status).to.equal(400);
        expect(ex.response.data).to.have.property('error');
        expect(ex.response.data.error).to.be.an('array');
        expect(ex.response.data.error).to.have.lengthOf(1);
        expect(ex.response.data.error[0]).to.have.property('message');
        expect(ex.response.data.error[0].message).to.equal('must have required property \'name\'');
      }
    });
  });
});
