const truncate = (input: string, maxLength = 5) => {
  if (input.length > maxLength) {
    return input.substring(0, maxLength) + '...'
  }
  return input
}

const parseObjectFromString = (
  str: string,
  { delimiter }: { delimiter: string }
) => {
  if (!str) {
    return {}
  }
  const tupleArr = str
    .replace(/ /g, '')
    .split(delimiter)
    .filter((e) => !!e)
    .map((v) => v.split('='))

  return Object.fromEntries(tupleArr)
}

const parseParamsFromURL = (url: string) => {
  const params = url.split('?').pop()
  return parseObjectFromString(params, { delimiter: '&' })
}

export { truncate, parseObjectFromString, parseParamsFromURL }
