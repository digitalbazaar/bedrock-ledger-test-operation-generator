/*!
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const _jobQueue = require('./job-queue');
const bedrock = require('bedrock');
const {config} = bedrock;
const logger = require('./logger');

// const worker = require('./worker');
require('bedrock-ledger-context');
require('bedrock-express');
require('bedrock-webpack');
require('bedrock-views');
require('./server');

require('./config');

bedrock.events.on('bedrock-cli.init', () => bedrock.program
  .option('--aws', 'Configure for AWS.')
  .option('--dev', 'Configure for local dev.')
);

bedrock.events.on('bedrock-cli.ready', async () => {
  if(bedrock.program.aws) {
    require('./config-aws');
    const awsInstanceMetadata = require('aws-instance-metadata');
    const localIp = await awsInstanceMetadata.fetch('local-ipv4');
    const publicIp = await awsInstanceMetadata.fetch('public-ipv4');
    config.server.bindAddr = [localIp];
    config.server.domain = publicIp;
  }
  if(bedrock.program.dev) {
    require('./config-dev');
  }
});

bedrock.events.on(
  'bedrock-ledger-test-operation-generation.add-targets', async targets => {
    await _jobQueue.jobQueue.add({targets}, {
      // prevent duplicate jobs by specifying a non-unique jobId
      jobId: 'sendOperations',
      // repeated jobs are completed and rescheduled on every iteration
      repeat: {
        every: 1000
      },
      // do not keep record of completed/failed jobs in redis
      removeOnComplete: true,
      removeOnFail: true,
    });
    logger.debug('SUCCESSFULLY ADDED JOB');
  });
