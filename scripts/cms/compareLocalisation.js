/* eslint-disable import/no-dynamic-require */
const Axios = require('axios')

const { exitTheProcessWithError } = require('../helpers')

const { getFileNameFromCMSItem } = require('./cms.helpers')

require('dotenv').config({
  path: process?.env?.ENVFILE || '.env.live-internal'
})

const CMS_dir = '../../CMS/'

const getCMSBaseURL = () => {
  const baseUrl = process.argv.find((arg) => arg.includes('CMS_BASE_URL'))
  return baseUrl ? baseUrl.split('=')[1] : process.env.CMS_BASE_URL
}

const getLocalisationVersions = async () => {
  try {
    const root_url = `${getCMSBaseURL()}${process.env.CMS_ROOT_BASE_URL}`
    const { data: cmsRootData } = await Axios.get(root_url)
    const localisations_url = cmsRootData.app_package.items.find(
      (item) => item.id === 'internationalisation'
    ).resource

    const { data: localisationsData } = await Axios.get(localisations_url)
    const { translation_items } = localisationsData.internationalisation

    const allPromises = translation_items.map(async (resourceItem) => {
      const { data: resourceData } = await Axios.get(resourceItem.resource)
      const fileName = getFileNameFromCMSItem(resourceItem)
      const resourcePath = `${CMS_dir}${fileName}.json`

      return {
        [resourceItem.locale]: {
          remote: resourceData,
          local: require(`${resourcePath}`)
        }
      }
    })

    const localisation = (await Promise.all(allPromises)).reduce(
      (result, item) => ({ ...result, ...item }),
      {}
    )

    return localisation
  } catch (error) {
    throw error
  }
}

const logResults = (locale, newRemoteKeys, newLocalKeys, changedKeys) => {
  console.log('*'.repeat(100))
  console.log('Translation Differences in ', locale)
  console.log('*'.repeat(100), '\n')

  Object.keys(newRemoteKeys).length &&
    console.log(
      'Keys in remote CMS that is not in local CMS:\n\n',
      newRemoteKeys
    )

  Object.keys(newLocalKeys).length &&
    console.log(
      '\n\nKeys in local CMS that is not in remote CMS:\n\n',
      newLocalKeys
    )

  if (Object.keys(changedKeys).length) {
    console.log(
      '\n\nMismatched values between remote CMS and local CMS:\n\n',
      changedKeys,
      '\n\n'
    )
  }

  console.log(`\n${'-'.repeat(100)}`, '\n\n\n')
}

const compareLocalisation = (remoteKeys, localKeys, locale) => {
  const changedKeys = {}

  Object.keys(remoteKeys).forEach((key) => {
    if (localKeys.hasOwnProperty(key)) {
      if (JSON.stringify(localKeys[key]) !== JSON.stringify(remoteKeys[key])) {
        changedKeys[key] = {
          local: localKeys[key],
          remote: remoteKeys[key]
        }
      }
      delete localKeys[key]
      delete remoteKeys[key]
    }
  })

  logResults(locale, remoteKeys, localKeys, changedKeys)

  return [changedKeys, localKeys, remoteKeys].every(
    (item) => Object.keys(item).length === 0
  )
}

const compareLocalisationFiles = async () => {
  try {
    const localisation = await getLocalisationVersions()
    const localisationComparisonStatuses = Object.keys(localisation).map(
      (key) =>
        compareLocalisation(
          localisation[key].remote,
          localisation[key].local,
          key
        )
    )

    if (localisationComparisonStatuses.some((status) => status === false)) {
      throw new Error(
        'Your local version is not synchronized with the remote CMS'
      )
    }
  } catch (error) {
    exitTheProcessWithError(error, console.error)
  }
}

module.exports = {
  compareLocalisationFiles,
  compareLocalisation,
  logResults,
  getLocalisationVersions,
  getCMSBaseURL
}

compareLocalisationFiles()
