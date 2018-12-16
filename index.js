const { writeFileSync } = require('fs')
var { join } = require('path')
var Server = require('scuttlebot-release')
var Config = require('peach-config')

module.exports = startServer

function startServer () {
  var createServer = Server
    .use(require('scuttlebot-release/node_modules/scuttlebot/plugins/master'))
    .use(require('scuttlebot-release/node_modules/scuttlebot/plugins/gossip'))
    .use(require('scuttlebot-release/node_modules/scuttlebot/plugins/replicate'))
    .use(require('scuttlebot-release/node_modules/scuttlebot/plugins/no-auth'))
    .use(require('scuttlebot-release/node_modules/scuttlebot/plugins/unix-socket'))
    .use(require('ssb-friends'))
    .use(require('ssb-blobs'))
    .use(require('scuttlebot-release/node_modules/scuttlebot/plugins/invite'))
    .use(require('scuttlebot-release/node_modules/scuttlebot/plugins/local'))
    .use(require('./plugins/logging'))
    .use(require('ssb-ebt'))

  var config = Config.ssb()
  var server = createServer(config)

  // write RPC manifest to ~/.ssb/manifest.json
  var manifestFile = join(config.path, 'manifest.json')
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
