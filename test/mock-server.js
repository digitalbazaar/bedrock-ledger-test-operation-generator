/*!
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {asyncHandler} = require('bedrock-express');
const bedrock = require('bedrock');

// per worker operation counter
let operationCounter = 0;
bedrock.events.on('bedrock-express.configure.routes', app => {
  app.post('/mockOperationEndpoint', asyncHandler(async (req, res) => {
    console.log('operations received', ++operationCounter);
    res.status(204).end();
  }));
});
