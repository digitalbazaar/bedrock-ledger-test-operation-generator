/*!
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const async = require('async');
const {config: {constants}, util: {uuid}} = require('bedrock');
let request = require('request');
request = request.defaults({
  json: true, strictSSL: false, pool: {maxSockets: 250}
});
require('bedrock-ledger-context');

// a simple worker for use in node.js (as a child process)

// load workerpool
const workerpool = require('workerpool');

function sendOperations({endpoint, operationsPerSecond, targetNode}) {
  async.timesLimit(operationsPerSecond, 250, (i, callback) => {
    /* eslint-disable max-len */
    const operation = {
      '@context': constants.WEB_LEDGER_CONTEXT_V1_URL,
      type: 'CreateWebLedgerRecord',
      creator: targetNode,
      record: {
        // '@context': {'@vocab': 'https://w3id.org/payments#'},
        // '@context': constants.TEST_CONTEXT_V1_URL,
        // '@context': constants.SCHEMA_URL,
        id: `https://example.com/transaction/${uuid()}`,
        // lowPrice: Math.floor(Math.random() * 100000000000),
        // maxPrice: Math.floor(Math.random() * 1000000000000),
        price: Math.floor(Math.random() * 1000000000000),
        // sourceAccount: Math.floor(Math.random() * 100000000000),
        // destinationAccount: Math.floor(Math.random() * 1000000000000),
        // memo: `Transaction ${Math.floor(Math.random() * 1000000000000)}`,
        // proof: {
        //   type: 'Ed25519Signature2018',
        //   created: '2018-02-19T14:48:48Z',
        //   creator: 'did:v1:test:nym:8IyxSpzUFcby2pe_oSdsbjb_1hLjo0eqaQSNRPrpUxw#ocap-invoke-key-1',
        //   capability: 'did:v1:test:nym:8IyxSpzUFcby2pe_oSdsbjb_1hLjo0eqaQSNRPrpUxw',
        //   capabilityAction: 'transact',
        //   jws: 'eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..u-alElcqe_xri6GLL10Ozi1LwLO9HpUXmsRqnjTa7jhAf1pFbAjdGDNhDjg0QvCIw',
        //   proofPurpose: 'invokeCapability'
        // }
      },
      // proof: {
      //   type: 'Ed25519Signature2018',
      //   created: '2018-02-19T14:48:48Z',
      //   creator: 'did:v1:test:nym:8IyxSpzUFcby2pe_oSdsbjb_1hLjo0eqaQSNRPrpUxw#ocap-invoke-key-1',
      //   capability: 'did:v1:test:nym:8IyxSpzUFcby2pe_oSdsbjb_1hLjo0eqaQSNRPrpUxw',
      //   capabilityAction: 'CreateWebLedgerRecord',
      //   jws: 'eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..u-alElcqe_xri6GLL10Ozi1LwLO9HpUXmsRqnjTa7jhAf1pFbAjdGDNhDjg0QvCIw',
      //   proofPurpose: 'invokeCapability'
      // }
    };
    /* eslint-enable */

    // request.post(helpers.createHttpSignatureRequest({
    //   url: ledgerOperationService,
    //   body: operation,
    //   identity: actor
    request.post({
      url: endpoint,
      body: operation,
      pool: {maxSockets: 250}
    }, (err, res) => {
      if(err) {
        console.error(err);
        return callback(err);
      }
      if(res.statusCode !== 204) {
        err = new Error(
          'Error sending event: server did not respond with 204.');
        console.error('ERROR', err);
        console.error('statusCode', res.statusCode);
        console.error('body', JSON.stringify(res.body, null, 2));
        return callback(err);
      }
    });
  });
}

// create a worker and register public functions
workerpool.worker({sendOperations});
