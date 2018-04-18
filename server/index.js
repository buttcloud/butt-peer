const { writeFileSync } = require('fs')
var Url = require('url')
var { join } = require('path')
var Server = require('scuttlebot')

var Config = require('../config')

module.exports = startServer

function startServer () {
  var createServer = Server
      .use(require('./plugins/address'))
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

  var config = Config()
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
      server.logger.info({
        address,
        env
      })
    }
  })

  return server
}
