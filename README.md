# CLI Apply

[![Travis Build](https://img.shields.io/travis/rphansen91/cli-apply.svg?style=flat-square)](https://travis-ci.org/rphansen91/cli-apply)
[![Codecov](https://img.shields.io/codecov/c/github/rphansen91/cli-apply.svg?style=flat-square)](https://codecov.io/gh/rphansen91/cli-apply)
[![npm](https://img.shields.io/npm/v/cli-apply.svg?style=flat-square)](https://www.npmjs.com/package/cli-apply)
[![downloads](https://img.shields.io/npm/dw/cli-apply.svg?style=flat-square)](https://www.npmjs.com/package/cli-apply)

## Description

CLI Apply is a simple way to create node applications that can be executed and interfaced with using the command line.

## Usage

```js
const cliApply = require('cli-apply')

cliApply({
  one: function (x, y) {
    return [x, y]
  },
  two: function (x, y) {
    return [y, x]
  }
}, {})
.then(function (result) {
  console.log(result)
})
```

1. When the file is executed, a terminal prompt will ask you which function you would like to execute.

  ![images/usage1.png](images/usage1.png)

2. Once selected an array can be supplied which will be the parameters of the function.

  ![images/usage2.png](images/usage2.png)

3. The specified function will be executed with the given parameters and will return the result.

  ![images/usage3.png](images/usage3.png)
