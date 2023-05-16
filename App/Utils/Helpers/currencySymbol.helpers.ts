import { CURRENCY_CODE_SYMBOL } from 'App/Utils/Enums/currencySymbols'

const getSymbolFromCurrency = (currencyCode: string) => {
  if (typeof currencyCode !== 'string') {
    return undefined
  }

  const code = currencyCode.toUpperCase()
  return CURRENCY_CODE_SYMBOL[code]
}

const concateAmountWithCurrency = (num: number | string, unit: string) => {
  if (typeof unit === 'string') {
    const currency = getSymbolFromCurrency(unit)
    if (currency) {
      return num + currency
    }
  }
  return ''
}

export { getSymbolFromCurrency, concateAmountWithCurrency }
