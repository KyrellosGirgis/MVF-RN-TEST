/* eslint-disable import/namespace */
import { PermissionsAndroid } from 'react-native'
import Share from 'react-native-share'
import * as ReactNativePermissions from 'react-native-permissions'
import * as permissionTypes from '@vfgroup-oneplatform/foundation/PermissionsManager/permissionTypes'

import RNFetchBlob from 'rn-fetch-blob'

import RNFS from 'react-native-fs'

import { billInvoiceData } from '__tests__/App/Services/api/Requests/Billing/data'
import {
  managePDFDownload,
  generateFileName
} from 'App/Services/API/Requests/DownloadPDF/downloadPDF.helper'

import * as AlertHelper from 'App/Utils/Helpers/alert.helper'
import { loadPDF } from 'App/Services/API/Requests/DownloadPDF/downloadPDF'

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock')
)
jest.mock('App/Services/API/Requests/DownloadPDF/downloadPDF', () => {
  return {
    loadPDF: jest.fn()
  }
})
jest.mock('rn-fetch-blob', () => {
  return {
    fs: {
      dirs: {
        DocumentDir: 'DocumentDirectory',
        DownloadDir: 'DownloadDirectory'
      },
      writeFile: jest.fn(),
      unlink: jest.fn()
    },
    DocumentDir: () => {},
    android: { addCompleteDownload: jest.fn() }
  }
})
const PDFLink =
  'https://api.vodafone.de/mva/v1/tmf-api/document/v4/document/urn:vf-de-dxl-tmf:vf:mobile:ban-document-id:123456789-WHJoVEt6VEdTZkxMa1V4QnVrR2Q0c1pZVEJHVkR4WjhFK21vOWNpVkFKSFFXOGhOcEhHTzF5R2tkL3ZpQmRvTVBxZnFlR0V0NXJtQUJhUS9xSlFlQWI5YTVKTkh2M3d2LzRFdER0TlVDeHNMck5TTGdVS0FjWUhuZHU5cFZNbHBJNFVWeEI3YTN5cWdVajVZM3kyc01JalRHa214YUJuZndYM2prMVhDNFJrNHlWNFZPVy9ZZUNPVVpBVHVqOFRTLzJJWFV1aE01ZGVsT3dEVlN4ZXhzdGNMQVBsOEkvNGduaE1GQUhtY084az0'
describe('test Download pdf Helper functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call loadPDF when invoke managePDFDownload in IOS', async () => {
    loadPDF.mockImplementation(() => {
      return billInvoiceData
    })
    RNFS.exists = jest.fn().mockReturnValue(false)
    await managePDFDownload(PDFLink)
    expect(loadPDF).toHaveBeenCalled()
    const dir = RNFetchBlob.fs.dirs.DocumentDir
    const pdf = billInvoiceData.binaryAttachment[0]
    const fileName = `${'/'}${pdf.name}`

    const config = {
      type: 'url',
      content: dir + fileName
    }
    const options = {
      failOnCancel: false,

      activityItemSources: [
        {
          placeholderItem: config,
          item: {
            default: config
          }
        }
      ]
    }

    expect(RNFetchBlob.fs.writeFile).toHaveBeenCalledWith(
      `${dir}${fileName}`,
      pdf.content,
      'base64'
    )
    expect(Share.open).toHaveBeenCalledWith(options)
    expect(RNFetchBlob.fs.unlink).toHaveBeenCalledWith(dir + fileName)
  })

  test('should call loadPDF when invoke managePDFDownload in ANDROID', async () => {
    RNFS.exists = jest.fn().mockReturnValue(false)
    permissionTypes.permissions = {
      ...ReactNativePermissions.PERMISSIONS.ANDROID
    }
    const Platform = require('react-native').Platform
    Platform.select = jest.fn((obj) => obj.android)
    Platform.OS = 'android'

    PermissionsAndroid.request = jest.fn(
      () => PermissionsAndroid.RESULTS.GRANTED
    )

    await managePDFDownload(PDFLink)
    expect(loadPDF).toHaveBeenCalledWith(PDFLink)

    expect(PermissionsAndroid.request).toHaveBeenCalledWith(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    )
    const dir = RNFetchBlob.fs.dirs.DownloadDir
    const pdf = billInvoiceData.binaryAttachment[0]
    const fileName = `${'/'}${pdf.name}`

    expect(RNFetchBlob.fs.writeFile).toHaveBeenCalledWith(
      `${dir}${fileName}`,
      pdf.content,
      'base64'
    )
  })

  test('should call loadPDF but not save file if permission not grannted in ANDROID', async () => {
    const RN = require('react-native')
    const Platform = RN.Platform
    const PermissionsAndroid = RN.PermissionsAndroid
    Platform.select = jest.fn((obj) => obj.android)
    Platform.OS = 'android'
    PermissionsAndroid.request = jest.fn(
      () => PermissionsAndroid.RESULTS.DENIED
    )

    await managePDFDownload(PDFLink)
    expect(loadPDF).toHaveBeenCalledWith(PDFLink)

    expect(PermissionsAndroid.request).toHaveBeenCalledWith(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    )

    expect(RNFetchBlob.fs.writeFile).not.toHaveBeenCalled()
  })

  test('should generateFileName function return the expected file name with expected version', async () => {
    RNFS.exists = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)
    const fileNameWithVersion = await generateFileName('testFile', '/path/to')
    expect(fileNameWithVersion).toEqual('testFile(1).pdf')
  })

  test('should call showPermissionWarningAlert if permission result is NEVER_ASK_AGAIN in ANDROID', async () => {
    const RN = require('react-native')
    const Platform = RN.Platform
    const PermissionsAndroid = RN.PermissionsAndroid
    Platform.select = jest.fn((obj) => obj.android)
    Platform.OS = 'android'
    PermissionsAndroid.request = jest.fn(
      () => PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    )

    AlertHelper.showPermissionWarningAlert = jest.fn()
    await managePDFDownload(PDFLink)
    expect(loadPDF).toHaveBeenCalledWith(PDFLink)
    expect(PermissionsAndroid.request).toHaveBeenCalledWith(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    )

    expect(AlertHelper.showPermissionWarningAlert).toHaveBeenCalled()
  })
})
