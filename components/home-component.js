/*!
 * Copyright (c) 2017-2018 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  bindings: {
    collection: '<brCollection',
    onChangeEvent: '&brOnChangeEvent'
  },
  controller: Ctrl,
  templateUrl: 'bedrock-ledger-test-operation-generator/home-component.html'
};

/* @ngInject */
function Ctrl($q, $route) {
  const self = this;

  self.eventChanged = agent => $q.resolve(self.onChangeEvent({
    agentId: agent.ledgerAgent.id,
    eventsPerSec: agent.meta.eventsPerSec}));

  self.refresh = () => {
    $route.reload();
  };
}
