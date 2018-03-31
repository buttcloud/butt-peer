var { readFileSync } = require('fs')
var { join } = require('path')
var pull = require('pull-stream/pull')
var toPull = require('stream-to-pull-stream')
var createHash = require('multiblob/util').createHash
var Client = require('ssb-client')
var cmdAliases = require('scuttlebot/lib/cli-cmd-aliases')
var muxrpcli = require('muxrpcli')

var Config = require('../config')

module.exports = commandClient

function commandClient (args) {
  const config = Config()

  // read manifest.json
  var manifestFile = join(config.path, 'manifest.json')
  var manifest
  try {
    manifest = JSON.parse(readFileSync(manifestFile))
  } catch (err) {
    throw new Error(`could not read manifest: ${manifestFile}`)
  }

  Client(config.keys, {
    manifest,
    port: config.port,
    host: config.host || 'localhost',
    caps: config.caps,
    key: config.key || config.keys.id
  }, function (err, rpc) {
    if(err) throw err

    // add aliases
    for (var k in cmdAliases) {
      rpc[k] = rpc[cmdAliases[k]]
      manifest[k] = manifest[cmdAliases[k]]
    }

    // add some extra commands
    manifest.version = 'async'
    manifest.config = 'sync'
    rpc.version = function (cb) {
      console.log(require('../package.json').version)
      cb()
    }
    rpc.config = function (cb) {
      console.log(JSON.stringify(config, null, 2))
      cb()
    }

    // HACK
    // we need to output the hash of blobs that are added via blobs.add
    // because muxrpc doesnt support the `sink` callback yet, we need this manual override
    // -prf
    if (args[0] === 'blobs.add') {
      var filename = args[1]
      var source =
        filename ? File(args[1])
      : !process.stdin.isTTY ? toPull.source(process.stdin)
      : (function () {
        console.error('USAGE:')
        console.error('  blobs.add <filename> # add a file')
        console.error('  source | blobs.add   # read from stdin')
        process.exit(1)
      })()
      var hasher = createHash('sha256')
      pull(
        source,
        hasher,
        rpc.blobs.add(function (err) {
          if (err) throw err
          console.log('&'+hasher.digest)
          process.exit()
        })
      )
      return
    }

    // run commandline flow
    muxrpcli(args, manifest, rpc, config.verbose)
  })
}
