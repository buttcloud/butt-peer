const { writeFileSync } = require('fs')
var Url = require('url')
var { join } = require('path')
var Config = require('ssb-config/inject')
var Keys = require('ssb-keys')
var Server = require('scuttlebot')

module.exports = Peer

function Peer (config) {
  var config = Config(process.env.ssb_appname)
  config.keys = Keys.loadOrCreateSync(join(config.path, 'secret'))

  var createServer = Server
      .use(require('scuttlebot/plugins/plugins'))
      .use(require('scuttlebot/plugins/master'))
      .use(require('scuttlebot/plugins/gossip'))
      .use(require('scuttlebot/plugins/replicate'))
      .use(require('ssb-friends'))
      .use(require('ssb-blobs'))
      .use(require('scuttlebot/plugins/invite'))
      .use(require('scuttlebot/plugins/local'))
      .use(require('./plugins/logging'))
      .use(require('ssb-query'))
      .use(require('ssb-links'))
      .use(require('ssb-ws'))
      .use(require('ssb-ebt'))

  var server = createServer(config)

  // write RPC manifest to ~/.ssb/manifest.json
  var manifestFile = join(config.path, 'manifest.json');
  writeFileSync(manifestFile, JSON.stringify(server.getManifest(), null, 2))

  server.address((err, address) => {
    if (err) {
      server.logger.error(err)
      process.exit(1)
    } else {
      const env = process.env.NODE_ENV || 'undefined'
      const url = Url.parse(address)
      server.logger.info({
        url: address,
        port: url.port,
        env
      })
    }
  })

  return server
}
