module.exports = function parser (str, def) {
  return new Promise((res, rej) => {
    try {
      res(eval(str))
    } catch (err) {
      rej(err)
    }
  })
}
