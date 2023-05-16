const getOffestFromUrl = (url?: string) => {
  url?.includes('offset')
  return url
    ?.split('&')
    ?.filter((paramter: string) => {
      return paramter?.includes('offset')
    })[0]
    ?.split('=')[1]
}
export { getOffestFromUrl }
