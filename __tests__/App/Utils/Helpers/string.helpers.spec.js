import {
  truncate,
  parseObjectFromString
} from 'App/Utils/Helpers/string.helpers'

describe('Helpers - string.helpers', () => {
  describe('test truncate function ', () => {
    test('should return the rest of the sentence ... because it more than 5 characters ', () => {
      const sentence = 'Congratulations'
      const result = truncate(sentence)
      expect(result).toBe('Congr...')
    })

    test('should return the rest of the sentence because it less than 5 characters ', () => {
      const sentence = 'test'
      const result = truncate(sentence)
      expect(result).toBe('test')
    })
  })

  describe('parseObjectFromString', () => {
    it('should parse object from string by delimiter', () => {
      const str = 'forApp=true;version=1'
      const parsedObject = parseObjectFromString(str, { delimiter: ';' })
      const expectedParsedObject = { forApp: 'true', version: '1' }
      expect(parsedObject).toStrictEqual(expectedParsedObject)
    })

    it('should replace any whitespace in string and then parse the object', () => {
      const str = ' forApp=true; version= '
      const parsedObject = parseObjectFromString(str, { delimiter: ';' })
      const wrongExpectedParsedObject = { forApp: 'true', version: ' ' }
      expect(parsedObject).not.toStrictEqual(wrongExpectedParsedObject)
      const rightExpectedParsedObject = { forApp: 'true', version: '' }
      expect(parsedObject).toStrictEqual(rightExpectedParsedObject)
    })

    it('should return empty object if str param is empty', () => {
      const str = ''
      const parsedObject = parseObjectFromString(str, { delimiter: ';' })
      expect(parsedObject).toStrictEqual({})
    })
  })
})
