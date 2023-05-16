const isDecimal = (num: number) => num % 1 !== 0

const trimAfterDecimal = (number: number, countAfterDecimal: number = 2) => {
  const [integralPart, fractionalPart] = number.toString().split('.')
  let fractionalNumber = fractionalPart || ''

  if (countAfterDecimal <= 0) {
    return integralPart
  }

  if (fractionalNumber.length > countAfterDecimal) {
    fractionalNumber = fractionalNumber.substring(0, countAfterDecimal)
  } else {
    fractionalNumber += '0'.repeat(countAfterDecimal - fractionalNumber.length)
  }
  return `${integralPart}.${fractionalNumber}`
}

export { isDecimal, trimAfterDecimal }
