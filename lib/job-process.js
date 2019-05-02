/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const pool = require('./pool');

exports.sendOperations = async job => {
  console.log('SENDING OPERATIONS', JSON.stringify(job, null, 2));
  const {data: {targets}} = job;
  for(const target of targets) {
    console.log('TARGET', target);
    pool.exec('sendOperations', [target]).catch(err => console.error(err));
  }
};
