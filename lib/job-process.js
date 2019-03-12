/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const pool = require('./pool');

exports.sendOperations = async job => {
  const {data: {agents}} = job;
  for(const agent of agents) {
    pool.exec('sendOperations', [agent]).catch(err => console.error(err));
  }
};
