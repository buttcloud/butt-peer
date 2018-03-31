var Logger = require('pino')

module.exports = function logging (server, conf) {
  var logger = Logger()
  var serverLogger = logger.child({
    id: server.id
  })

  server.on('log:debug', log(serverLogger, 'debug'))
  server.on('log:info', log(serverLogger, 'info'))
  server.on('log:notice', log(serverLogger, 'warn'))
  server.on('log:warning', log(serverLogger, 'error'))
  server.on('log:error', log(serverLogger, 'fatal'))

  server.logger = serverLogger
}

function log (logger, level) {
  return function (ary) {
    var message = ary.join(' ')
    logger[level](message)
  }
}

module.exports.init = module.exports
