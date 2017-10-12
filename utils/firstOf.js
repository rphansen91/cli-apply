module.exports = function (type) {
  return function (...args) {
    return args.reduce((acc, c) => {
      if (typeof acc === type) return acc
      return c
    })
  }
}
