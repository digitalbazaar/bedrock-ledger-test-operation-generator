/*!
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const config = bedrock.config;
const os = require('os');
const path = require('path');

config.server.port = 28443;
config.server.httpPort = 28080;

const cfg = config['ledger-test-operation-generator'] = {};

const basePath = '/ledger-test-operation-generator';
cfg.routes = {
  basePath,
  targets: `${basePath}/targets`,
};

config.paths.log = path.join(
  os.tmpdir(), 'bedrock-ledger-test-operation-generator');

// core configuration
config.core.workers = 1;
config.core.worker.restart = true;

// logger config
config.loggers.app.tailable = true;
config.loggers.app.level = 'debug';

// add pseudo packages
const rootPath = path.join(__dirname, '..');
config.views.system.packages.push({
  path: path.join(rootPath, 'components'),
  manifest: path.join(rootPath, 'package.json')
});
config.views.vars.minify = true;
