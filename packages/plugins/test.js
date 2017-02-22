'use strict'

const WS = require('uws')
// const WS = require('ws')

const sock = new WS('wss://ws.jabberfr.org', ['xmpp'])
sock.on('error', (err) => {
  console.log('error', err)
})
sock.on('open', () => {
  console.log('open')
})
