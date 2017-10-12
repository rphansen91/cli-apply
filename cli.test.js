const { check, gen, property } = require('testcheck');
const cli = require('./cli')

describe('CLI Apply', () => {

  test('Should throw error if prompt not supplied', () => {
    expect(() => cli()).toThrowError('Must supply a valid prompt method')
  })

  test('Should reject if no module supplied', () => {
    const prompt = mockPrompt('', '')
    const apply = cli(prompt)
    return expect(apply()).rejects.toEqual(new Error('Must supply a valid module'))
  })

  test('Should reject if arguments invalid', () => {
    const fn = jest.fn()
    const prompt = mockPrompt('fn', 'person')
    const apply = cli(prompt)
    return expect(apply({ fn })).rejects.toEqual(new Error('person is not defined'))
  })

  test('Should call the selected method', () => {
    const fn = jest.fn()
    const method = 'fn'
    const args = '[1,2]'
    const prompt = mockPrompt(method, args)
    const apply = cli(prompt)
    return apply({ fn })
    .then(() => expect(fn).toBeCalledWith(1, 2))
  })

  test('Should call the deeply nested method', () => {
    const fn = jest.fn()
    const method = 'fn'
    const args = '[1,2]'
    const prompt = mockPrompt(method, args)
    const apply = cli(prompt)
    return apply({ fn: { fn: { fn } } })
    .then(() => expect(fn).toBeCalledWith(1, 2))
  })

  test('Should log the output', () => {
    const fn = jest.fn()
    const method = 'fn'
    const args = '[1,2]'
    const prompt = mockPrompt(method, args)
    const apply = cli(prompt)
    return apply({ fn }, { logging: true })
    .then(() => expect(fn).toBeCalledWith(1, 2))
  })
})

function mockPrompt (method, args) {
  return function (prompt) {
    return Promise.resolve({ method, args })
  }
}
