/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

// const logger = require('./logger');
const {util: {clone}} = require('bedrock');
const pool = require('./pool');

exports.sendOperations = async job => {
  const {totalWorkers} = pool.stats();
  const {data: {targets}} = job;
  const tPromises = [];
  for(const target of targets) {
    for(let i = 0; i < totalWorkers; ++i) {
      const t = clone(target);
      t.operationsPerSecond =
        parseInt(target.operationsPerSecond / totalWorkers);
      tPromises.push(
        pool.exec('sendOperations', [t]).catch(err => console.error(err)));
    }
  }
  await Promise.all(tPromises);
};
