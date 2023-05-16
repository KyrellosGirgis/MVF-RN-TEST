import {
  getSymbolFromCurrency,
  concateAmountWithCurrency
} from 'App/Utils/Helpers/currencySymbol.helpers'
import { CURRENCY_CODE_SYMBOL } from 'App/Utils/Enums/currencySymbols'

describe('test Utils CurrencySymbolMap functions', () => {
  test('should return expected symbol if passed a valid currency', async () => {
    const symbol = getSymbolFromCurrency('eur')

    expect(symbol).toEqual(CURRENCY_CODE_SYMBOL.EUR)
  })

  test('should return undefined if passed an invalid currency', async () => {
    const symbol = getSymbolFromCurrency('anything')

    expect(symbol).toEqual(undefined)
  })

  test('should return undefined if passed any thing other than a string', async () => {
    const symbol = getSymbolFromCurrency({ unit: 'eur' })

    expect(symbol).toEqual(undefined)
  })

  test('should concateAmountWithCurrency return the right currency with concat of right value', async () => {
    const result = await concateAmountWithCurrency(20, 'EUR')
    expect(result).toBe('20€')
  })
})
