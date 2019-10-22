/*
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const {config} = bedrock;

exports.configure = async () => {
  // core configuration
  config.core.workers = 0;

  config.jobs.queueOptions.redis.host = 'redis-docker';

  config.server.port = 18443;
  config.server.httpPort = 18080;
  config.server.bindAddr = ['0.0.0.0'];

  // env currently set for scaleway, digitalocean, aws, azure
  const localIp = process.env.PUBLIC_IP;

  if(!localIp || typeof localIp !== 'string') {
    throw new Error('Could not acquire local IP information.');
  }
  config.server.domain = localIp;
};
