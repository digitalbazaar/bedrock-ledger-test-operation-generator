/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const logger = require('./logger');
const pool = require('./pool');

exports.sendOperations = async job => {
  logger.debug('SENDING OPERATIONS', {job});
  const {data: targets} = job;
  for(const target of targets) {
    logger.debug('TARGET', {target});
    pool.exec('sendOperations', [target]).catch(err => console.error(err));
  }
};
