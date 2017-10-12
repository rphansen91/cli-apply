const cliApply = require('./index')
const examples = require('./examples')

cliApply(examples)
.then(function (result) {
  console.log(result)
})
.catch(function (err) {
  console.log('Error', err.message)
})
