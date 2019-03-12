/*!
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config} = require('bedrock');

config.server.port = 18443;
config.server.httpPort = 18080;

// core configuration
config.core.workers = 0;
