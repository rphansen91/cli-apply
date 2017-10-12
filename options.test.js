const { check, gen, property } = require('testcheck');
const defOptions = require('./options');

describe('Options', function () {

  function tester (opts) {
    test('Option types', () => {
      const { method, args, logging } = defOptions(opts)
      expect(typeof method).toBe('string')
      expect(typeof args).toBe('string')
      expect(typeof logging).toBe('boolean')
    })
  }

  tester({})

  check(property(gen.object({
    method: gen.any,
    args: gen.any,
    logging: gen.any
  }), tester))
})
