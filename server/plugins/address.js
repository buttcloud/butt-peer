module.exports = function address (server, conf) {
  const getInternalAddress = server.getAddress

  function getExternalAddress () {
    if (conf.externalHost) {
      const key = conf.keys.public
      const { port } = conf
      const host = conf.externalHost
      return toAddress({ key, host, port })
    }
    return getInternalAddress()
  }

  server.getAddress = getExternalAddress
}

module.exports.init = module.exports

function toAddress ({ key, host, port }) {
  const net = [
    'net',
    host,
    port
  ].join(':')

  const shs = [
    'shs',
    toBase64(key)
  ].join(':')

  return net + '~' + shs
}

function toBase64 (s) {
  if (isString(s)) return s
  else s.toString('base64') //assume a buffer
}

function isString (s) {
  return typeof s === 'string'
}
