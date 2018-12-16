const test = require('ava')

const peachSsbServer = require('../')

test('peach-ssb-server', function (t) {
  t.truthy(peachSsbServer, 'module is require-able')
})
