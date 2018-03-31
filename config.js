var { join } = require('path')
var Config = require('ssb-config/inject')
var Keys = require('ssb-keys')

module.exports = createConfig

function createConfig () {
  var config = Config(process.env.ssb_appname)
  config.keys = Keys.loadOrCreateSync(join(config.path, 'secret'))
  return config
}
