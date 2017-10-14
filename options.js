const firstOf = require('./utils/firstOf')
const firstString = firstOf('string')
const firstBoolean = firstOf('boolean')

module.exports = (opts={}) => ({
  method: firstString(opts.method, 'Select a methods'),
  args: firstString(opts.args, 'Enter parameters'),
  logging: firstBoolean(opts.logging, false)
})
