/*!
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {asyncHandler} = require('bedrock-express');
const bedrock = require('bedrock');
const {config} = bedrock;

bedrock.events.on('bedrock-express.configure.routes', app => {
  const {routes} = config['ledger-test-operation-generator'];

  app.post(routes.targets, asyncHandler(async (req, res) => {
    console.log('SERVER RECEIVED REQUEST', JSON.stringify(req.body, null, 2));
    await bedrock.events.emit(
      'bedrock-ledger-test-operation-generation.add-targets',
      req.body);
    res.status(204).end();
  }));
});
