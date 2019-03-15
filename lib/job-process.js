/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const pool = require('./pool');

exports.sendOperations = async job => {
  const {data: {targets}} = job;
  for(const target of targets) {
    pool.exec('sendOperations', [target]).catch(err => console.error(err));
  }
};
