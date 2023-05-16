import moment from 'moment'

import { LoginStatuses as Status } from '@vfgroup-oneplatform/login'
import { BackHandler } from 'react-native'

import {
  includesObject,
  replaceCountryCodeInMSISDN,
  getBaseURL,
  getTimeDifferenceFromNow,
  errorObjectConstructor,
  getLastScreenName,
  convertArrayToObject,
  removeKeysFromObject,
  androidBackHandler
} from 'App/Utils/Helpers/generic.helpers'

import { getDateDifference, dateFormat } from 'App/Utils/Helpers/date.helpers'

describe('test Utils Helper functions ', () => {
  test('should return correct result when checking if object exists in an array', () => {
    const arr = [
      { name: 'Katie', age: 26 },
      { name: 'Mark', age: 33 },
      { name: 'Constantinos', age: 23, address: { city: 'London' } }
    ]
    const includedObj = {
      age: 23,
      name: 'Constantinos',
      address: { city: 'London' }
    }
    const unincludedObj = { name: 'Jack', age: 23 }

    expect(includesObject(arr, includedObj)).toBeTruthy()
    expect(includesObject(arr, unincludedObj)).toBeFalsy()
  })

  test('should return correct result when getDateDifference', () => {
    const RealDate = Date.now
    global.Date.now = jest.fn(() => new Date('2022-02-01T10:20:30Z').getTime())
    expect(getDateDifference('2022-01-01T10:20:30Z').asDays()).toBe(31)
    expect(getDateDifference('2021-12-01T10:20:30Z').asDays()).toBe(62)
    global.Date.now = RealDate
  })

  test('should return the correct locale date format if date is sent', () => {
    moment.locale('en-gb')
    expect(dateFormat('2022-04-02', 'DD MMM')).toEqual('02 Apr')
    moment.locale('de')
    expect(dateFormat('2022-04-02', 'DD MMM')).toEqual('02 Apr.')
  })

  test('should return undefined if date is not sent', () => {
    expect(dateFormat(undefined, 'DD MMM')).toEqual(undefined)
  })

  test('should return the same number if length validation failed', () => {
    expect(replaceCountryCodeInMSISDN('+491234567')).toEqual('+491234567')
  })

  test('should return number start with 0 instead of 49', () => {
    expect(replaceCountryCodeInMSISDN('491023949219')).toEqual('01023949219')
  })

  describe('getBaseURL TESTS', () => {
    test('test getBaseURL get baseURL successfully without protocol type', () => {
      const baseURL = getBaseURL(
        'https://vodafone.de/asdasdasdasdas?=asfdjasjdaksjdasd'
      )
      expect(baseURL).toEqual('vodafone.de')
    })

    test('test getBaseURL get baseURL successfully without www', () => {
      const baseURL = getBaseURL('https://www.facebook.com?id=0000x0sdd')
      expect(baseURL).toEqual('facebook.com')
    })

    test('test getBaseURL should return empty string if url is undefined or no matched baseurl', () => {
      let baseURL = getBaseURL('Hello from the other side')
      expect(baseURL).toEqual('')
      baseURL = getBaseURL(undefined)
      expect(baseURL).toEqual('')
    })
  })

  describe('getTimeDifferenceFromNow', () => {
    it('returns the correct time difference in minutes', () => {
      const now = moment()
      const fiveMinutesAgo = moment().subtract(5, 'minutes')
      const tenMinutesAgo = moment().subtract(10, 'minutes')

      expect(getTimeDifferenceFromNow(now)).toBeCloseTo(0)
      expect(getTimeDifferenceFromNow(fiveMinutesAgo)).toBeCloseTo(5)
      expect(getTimeDifferenceFromNow(tenMinutesAgo)).toBeCloseTo(10)
    })

    it('handles invalid input gracefully', () => {
      expect(getTimeDifferenceFromNow('invalid date')).toBeNaN()
      expect(getTimeDifferenceFromNow(null)).toBeNaN()
    })
  })

  describe('errorObjectConstructor', () => {
    it('should return an error object with the correct properties when given an error response', () => {
      const error = {
        response: {
          data: {
            error: 'Invalid username or password',
            error_description:
              'The username or password you entered is incorrect.'
          }
        }
      }

      const defaultError = {
        status: Status.Failed,
        errorMessage: 'An error occurred',
        subErrorMessage: 'Please try again later'
      }

      const result = errorObjectConstructor(error, defaultError)

      expect(result).toEqual({
        status: Status.Failed,
        errorMessage: 'Invalid username or password',
        subErrorMessage: 'The username or password you entered is incorrect.'
      })
    })

    it('should return the default error object when given an empty error object', () => {
      const error = {}

      const defaultError = {
        status: Status.Failed,
        errorMessage: 'An error occurred',
        subErrorMessage: 'Please try again later'
      }

      const result = errorObjectConstructor(error, defaultError)
      expect(result).toEqual(defaultError)
    })
  })

  describe('getLastScreenName', () => {
    it('should return undefined when AppNavRef is undefined', () => {
      global.AppNavRef = undefined
      const result = getLastScreenName()
      expect(result).toBe(undefined)
    })
  })

  describe('convertArrayToObject', () => {
    it('should convert an array of objects to an object with the specified property as the key', () => {
      const inputArray = [
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' }
      ]
      const expectedOutput = {
        1: { id: 1, name: 'test1' },
        2: { id: 2, name: 'test2' },
        3: { id: 3, name: 'test3' }
      }
      const result = convertArrayToObject(inputArray, 'id')
      expect(result).toEqual(expectedOutput)
    })

    it('should return an empty object when the input array is empty', () => {
      const inputArray = []
      const expectedOutput = {}
      const result = convertArrayToObject(inputArray, 'id')
      expect(result).toEqual(expectedOutput)
    })

    it('should return an object with undefined values when the input array contains objects without the specified property', () => {
      const inputArray = [
        { id: 1, name: 'test1' },
        { name: 'test2' },
        { id: 3, name: 'test3' }
      ]
      const expectedOutput = {
        1: { id: 1, name: 'test1' },
        undefined: { name: 'test2' },
        3: { id: 3, name: 'test3' }
      }
      const result = convertArrayToObject(inputArray, 'id')
      expect(result).toEqual(expectedOutput)
    })
  })

  describe('removeKeysFromObject', () => {
    test('does not modify object if keys array is empty', () => {
      const dataSource = {
        name: 'John',
        age: 30,
        email: 'john@example.com'
      }
      const keys = []
      removeKeysFromObject(dataSource, keys)
      expect(dataSource).toEqual({
        name: 'John',
        age: 30,
        email: 'john@example.com'
      })
    })

    test('does not modify object if dataSource is null or undefined', () => {
      const dataSource = null
      const keys = ['name']
      removeKeysFromObject(dataSource, keys)
      expect(dataSource).toBeNull()

      const dataSource2 = undefined
      removeKeysFromObject(dataSource2, keys)
      expect(dataSource2).toBeUndefined()
    })
  })

  describe('androidBackHandler', () => {
    const closeAppOnBackRoutes = ['Home', 'Settings']

    it('should not exit the app when current route is not included in closeAppOnBackRoutes', () => {
      const AppNavRef = {
        getCurrentRoute: () => ({ name: 'Dashboard' })
      }

      const spyExitApp = jest.spyOn(BackHandler, 'exitApp')

      expect(androidBackHandler(AppNavRef, closeAppOnBackRoutes)).toBe(false)
      expect(spyExitApp).not.toHaveBeenCalled()
    })

    it('should return false when current route is null or undefined', () => {
      const AppNavRef = {
        getCurrentRoute: () => null
      }

      const spyExitApp = jest.spyOn(BackHandler, 'exitApp')

      expect(androidBackHandler(AppNavRef, closeAppOnBackRoutes)).toBe(false)
      expect(spyExitApp).not.toHaveBeenCalled()

      AppNavRef.getCurrentRoute = () => undefined

      expect(androidBackHandler(AppNavRef, closeAppOnBackRoutes)).toBe(false)
      expect(spyExitApp).not.toHaveBeenCalled()
    })
  })
})
