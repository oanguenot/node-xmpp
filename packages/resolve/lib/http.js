'use strict'

const fetch = global.fetch || require('node-fetch')
const {parse} = require('ltx')
const compareAltConnections = require('./alt-connections').sort

function resolve (domain) {
  return fetch(`https://${domain}/.well-known/host-meta`).then((res) => res.text()).then(res => {
    return parse(res).getChildren('Link')
    .filter(link => [
      'urn:xmpp:alt-connections:websocket',
      'urn:xmpp:alt-connections:httppoll',
      'urn:xmpp:alt-connections:xbosh'
    ].includes(link.attrs.rel)
    )
    .map(({attrs}) => ({
      rel: attrs.rel,
      href: attrs.href,
      method: attrs.rel.split(':').pop(),
      url: attrs.href
    })).sort(compareAltConnections)
  })
  .catch(() => {
    return []
  })
}

module.exports.resolve = resolve
