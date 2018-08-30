/*!
 * Copyright (c) 2017-2018 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
// import BlockService from './block-service.js';
import HomeComponent from './home-component.js';
import AgentService from './agent-service.js';

const module = angular.module('bedrock.ledger-test-operation-generator', [
  'ngMaterial', 'md.data.table'
]);

bedrock.setRootModule(module);

module.component('exHome', HomeComponent);
// module.service('brBlockService', BlockService);
module.service('brAgentService', AgentService);

/* @ngInject */
module.config($routeProvider => {
  $routeProvider
    .when('/', {
      title: 'Bedrock Ledger Operation Generator',
      template: '<ex-home br-collection="$resolve.collection" ' +
        'br-on-change-event="$resolve.onChangeEvent(agentId, eventsPerSec)">' +
        '</ex-home>',
      resolve: {
        collection: brAgentService => brAgentService.getAll()
          .then(() => brAgentService.collection),
        onChangeEvent: brAgentService => brAgentService.updateAgent
      }
    });
});
