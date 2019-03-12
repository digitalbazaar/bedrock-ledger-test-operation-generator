/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

process.env['NODE_PATH'] = '../node_modules';

const bedrock = require('bedrock');
require('../lib');

require('./mock-server');

require('bedrock-test');
bedrock.start();
