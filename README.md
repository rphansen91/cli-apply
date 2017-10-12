# CLI Apply

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
