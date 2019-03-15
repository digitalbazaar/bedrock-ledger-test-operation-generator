/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config, util: {delay}} = require('bedrock');
const {create} = require('apisauce');
const https = require('https');

let api;
const baseURL =
 `https://${config.server.host}` +
 `${config['ledger-test-operation-generator'].routes.basePath}`;

const mockOperationEndpoint =
  `https://${config.server.host}/mockOperationEndpoint`;

describe('operation generator API', () => {
  before(() => {
    api = create({
      baseURL,
      httpsAgent: new https.Agent({rejectUnauthorized: false})
    });
  });
  it('works', async () => {
    await api.post('/targets', {targets: [{
      endpoint: mockOperationEndpoint,
      operationsPerSecond: 50,
      targetNode: 'https://example.com/foo',
    }]});
    await delay(5500);
  });
});
