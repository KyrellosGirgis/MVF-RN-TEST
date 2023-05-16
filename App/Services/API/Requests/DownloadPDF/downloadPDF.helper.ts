import RNFetchBlob from 'rn-fetch-blob'

import { PermissionsAndroid, Platform } from 'react-native'

import Share from 'react-native-share'

import { exists } from 'react-native-fs'

import {
  DocumentDetailsResponse,
  BinaryAttachment
} from 'App/Services/API/Requests/DownloadPDF/downloadPDF.d'

import { loadPDF } from 'App/Services/API/Requests/DownloadPDF/downloadPDF'

import { translate } from 'App/Utils'
import { openAndroidPermissionSettings } from 'App/Utils/RNNativeModules/generic.RNNativeModules'
import { showPermissionWarningAlert } from 'App/Utils/Helpers/alert.helper'

const savePDFInTargetOSFolder = async (binaryAttachment: BinaryAttachment) => {
  const { name, content, mimeType } = binaryAttachment
  const dir = Platform.select({
    ios: RNFetchBlob.fs.dirs.DocumentDir,
    android: RNFetchBlob.fs.dirs.DownloadDir
  })
  const fileName = await generateFileName(`/${name.replace('.pdf', '')}`, dir)
  try {
    await RNFetchBlob.fs.writeFile(`${dir}${fileName}`, content, 'base64')
    RNFetchBlob.android.addCompleteDownload({
      title: fileName.replace('/', ''),
      description: 'Download complete',
      mime: mimeType,
      path: `${dir}${fileName}`,
      showNotification: true
    })
    return fileName
  } catch (err) {}
}

//make file name unique by generating version number to fix android 12 issue
const generateFileName = async (
  name: string,
  dir: string,
  version: number = 0
): Promise<String> => {
  const proposedFileName = `${name}${version ? '(' + version + ')' : ''}.pdf`
  const isExist = await exists(`${dir}${proposedFileName}`)

  return isExist
    ? await generateFileName(name, dir, version + 1)
    : proposedFileName
}

const requestAndroidWriteExternalStoragePermission = async () => {
  const storagePermission = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  )
  return storagePermission
}

const deleteFileFromDocumentsDirectoryInIOS = async (fileName: string) => {
  const dir = RNFetchBlob.fs.dirs.DocumentDir
  await RNFetchBlob.fs.unlink(dir + fileName)
}

const getShareOptionsActivityItemSources = (fileName: string) => {
  const dir = RNFetchBlob.fs.dirs.DocumentDir

  const config = {
    type: 'url',
    content: dir + fileName
  }
  return {
    placeholderItem: config,
    item: {
      default: config
    }
  }
}

const getShareOptions = async (pdfInfo: BinaryAttachment) => {
  const fileName = await savePDFInTargetOSFolder(pdfInfo)
  return {
    options: {
      failOnCancel: false,
      activityItemSources: [getShareOptionsActivityItemSources(fileName)]
    },
    fileName
  }
}

const downloadPDF = async (pdfInfo: BinaryAttachment) => {
  const storagePermission = await requestAndroidWriteExternalStoragePermission()
  if (storagePermission === PermissionsAndroid.RESULTS.GRANTED) {
    await savePDFInTargetOSFolder(pdfInfo)
  } else if (storagePermission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    showPermissionWarningAlert(
      translate('storagePermessionNotEnabledTitle'),
      translate('storagePermessionNotEnabledMessage'),
      () => {
        openAndroidPermissionSettings()
      }
    )
  }
}

const sharePDF = async (pdfInfo: BinaryAttachment) => {
  const { options, fileName } = await getShareOptions(pdfInfo)

  try {
    await Share.open(options)
  } catch (error) {}
  await deleteFileFromDocumentsDirectoryInIOS(fileName)
}

const managePDFDownload = async (documentLink: string) => {
  try {
    const pdfResponse: DocumentDetailsResponse = await loadPDF(documentLink)
    const downloadPDFOnTargetPlatform = Platform.select({
      ios: sharePDF,
      android: downloadPDF
    })
    pdfResponse &&
      (await downloadPDFOnTargetPlatform?.(pdfResponse.binaryAttachment[0]))
  } catch (error) {
    throw error
  }
}

export { managePDFDownload, generateFileName }
