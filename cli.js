const parser = require('./utils/parse')
const toArray = require('./utils/toArray')
const defaultOpts = require('./options')

function isFn (fn, cb) {
  return typeof fn === 'function'
}

function selectMethod (message, mod) {
  return {
    message: message,
    type: 'list',
    name: 'method',
    choices: Object.keys(mod)
  }
}

function selectArgs (message) {
  return {
    message: message,
    type: 'input',
    name: 'args'
  }
}

module.exports = function (prompt) {
  if (!isFn(prompt)) throw new Error('Must supply a valid prompt method')

  return function CLIApply (mod, opts) {
    var options = defaultOpts(opts)

    return Promise.resolve()
    .then(() => {
      if (!mod) throw new Error('Must supply a valid module')
      return prompt([selectMethod(options.method, mod)])
    })
    .then(({ method }) => mod[method])
    .then(method => {
      if (!isFn(method)) return CLIApply(method, opts)

      return prompt([selectArgs(options.args, mod)])
      .then(({ args }) => parser(args, []))
      .then(args => toArray(args))
      .then(args => method.apply(mod, args))
    })
    .then(res => {
      if (options.logging) console.log(res)
      return res
    })
  }
}
