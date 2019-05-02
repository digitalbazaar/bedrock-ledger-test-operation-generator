/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const _constants = require('./constants');
const _jobProcess = require('./job-process');
const bedrock = require('bedrock');
const brJobs = require('bedrock-jobs');

exports.jobQueue = null;

bedrock.events.on('bedrock.start', async () => {
  console.log('SETTING UP JOB QUEUE');
  exports.jobQueue = await brJobs.addQueue({name: _constants.JOB_QUEUE});
  exports.jobQueue.process(_jobProcess.sendOperations);
  console.log('SUCCESSFULLY SETUP JOB QUEUE');
});
