const {
  readdirSync,
  writeFileSync,
  appendFileSync,
  unlinkSync,
  existsSync
} = require('fs')
const { exec } = require('child_process')

const Axios = require('axios')

const { getFileNameFromCMSItem } = require('./cms.helpers')

require('dotenv').config({
  path: process?.env?.ENVFILE || '.env.live-internal'
})

const root_url = process.env.CMS_BASE_URL + process.env.CMS_ROOT_BASE_URL
const CMS_dir = 'CMS'

const deleteFile = (file) => {
  existsSync(file) && unlinkSync(file)
}

const removeFilesFromCMSDirectory = async () => {
  readdirSync(CMS_dir).forEach(
    (f) => !f.includes('internationalisation_') && deleteFile(`${CMS_dir}/${f}`)
  )
  writeFileSync(`${CMS_dir}/index.js`, '')
}

//todo async loop
const traverseCMSJSON = (cmsData) => {
  Object.keys(cmsData).forEach(async (key) => {
    if (typeof cmsData[key] === 'object') {
      traverseCMSJSON(cmsData[key])
    } else if (typeof cmsData[key] === 'string' && key === 'resource') {
      const { data } = await Axios.get(cmsData[key])
      const fileName = getFileNameFromCMSItem(cmsData)
      const filePath = `${CMS_dir}/${fileName}.json`
      traverseCMSJSON(data)

      if (!cmsData.resource.includes('internationalisation_')) {
        writeFileSync(filePath, JSON.stringify(data))
      }

      appendFileSync(
        `${CMS_dir}/index.js`,
        `export const ${fileName} = require('./${fileName}.json')\n`
      )
      exec(`npx prettier --write ${filePath}`)
    }
  })
}

const updateAllCMSItemsFromPipeline = async () => {
  removeFilesFromCMSDirectory()
  const { data: cmsRootData } = await Axios.get(root_url)
  const rootPath = `${CMS_dir}${process.env.CMS_ROOT_BASE_URL}`
  writeFileSync(rootPath, JSON.stringify(cmsRootData))
  appendFileSync(
    `${CMS_dir}/index.js`,
    `export const ${'root'} = require('./root.json')\n`
  )
  exec(`npx prettier --write ${rootPath}`)

  traverseCMSJSON(cmsRootData)
}

updateAllCMSItemsFromPipeline()
