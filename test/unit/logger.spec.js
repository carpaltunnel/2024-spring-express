import { expect } from 'chai';
import logger from '../../lib/logger.js';

describe('logger', () => {
  it('should have a Winston logger as a singleton', () => {
    expect(logger.log).to.be.an('object');
  });

  it('should not have a log property of null', () => {
    expect(logger.log).to.not.equal(null);
  });

  it('should have all standard log levels (debug, info, warn, error)', () => {
    expect(logger).to.have.property('debug');
    expect(logger).to.have.property('info');
    expect(logger).to.have.property('warn');
    expect(logger).to.have.property('error');
  });
});
