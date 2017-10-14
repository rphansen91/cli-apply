const getArguments = require('es-arguments')
const glamlog = require('glamlog')
const parser = require('./utils/parse')
const toArray = require('./utils/toArray')
const defaultOpts = require('./options')
const green = color('green')
const blue = color('blue')

function color (c) {
  return function (str) {
    return glamlog.style(str, c)
  }
}

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

function displaySignature (name, fn) {
  return blue(name) + ' (' + getArguments(fn)
  .map(green)
  .join(', ') + ')'
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
    .then(({ method }) => {
      const fn = mod[method]

      if (!isFn(fn)) return CLIApply(fn, opts)

      glamlog(displaySignature(method, fn))

      return prompt([selectArgs(options.args)])
      .then(({ args }) => parser(args, []))
      .then(args => toArray(args))
      .then(args => fn.apply(mod, args))
    })
    .then(res => {
      if (options.logging) console.log(res)
      return res
    })
  }
}
