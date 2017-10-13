module.exports = function parser (str) {
  return new Promise((res, rej) => {
    try {
      res(eval(str))
    } catch (err) {
      rej(err)
    }
  })
}
