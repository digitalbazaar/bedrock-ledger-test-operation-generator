/*!
 * Copyright (c) 2017-2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config} = require('bedrock');
const ifaces = require('os').networkInterfaces();

config.server.port = 18443;
config.server.httpPort = 18080;

// core configuration
config.core.workers = 0;

Object.keys(ifaces).forEach(ifname => {
  let alias = 0;

  ifaces[ifname].forEach(iface => {
    if('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if(alias >= 1) {
      // this single interface has multiple ipv4 addresses
      // console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      // console.log(ifname, iface.address);
      // FIXME: this algo can get confused by VPN `tun` interfaces
      config.server.bindAddr = [iface.address];
      config.server.domain = iface.address;
    }
    ++alias;
  });
});
