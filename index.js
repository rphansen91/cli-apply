const inquirer = require('inquirer')
const cli = require('./cli')
module.exports = cli(inquirer.prompt)
