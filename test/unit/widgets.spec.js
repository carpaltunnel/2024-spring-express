import assert from 'assert/strict';

describe('Widgets', () => {
  before(() => {
    console.log('--- BEFORE ALL');
  });

  beforeEach(() => {
    console.log('----- BEFORE EACH');
  });

  describe('getWidgets', () => {
    it('should return true', () => {
      assert(false === true);
    });

    it('should return false', () => {
      assert(true === false);
    });
  });
});
