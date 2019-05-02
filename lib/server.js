/*!
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {asyncHandler} = require('bedrock-express');
const bedrock = require('bedrock');
const {config} = bedrock;
const logger = require('./logger');

bedrock.events.on('bedrock-express.configure.routes', app => {
  const {routes} = config['ledger-test-operation-generator'];

  app.post(routes.targets, asyncHandler(async (req, res) => {
    logger.debug('SERVER RECEIVED REQUEST', {body: req.body});
    await bedrock.events.emit(
      'bedrock-ledger-test-operation-generation.add-targets',
      req.body);
    res.status(204).end();
  }));
});
