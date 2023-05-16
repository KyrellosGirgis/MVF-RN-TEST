import Config from 'react-native-config'

import {
  ACPTarget,
  ACPTargetParameters,
  ACPTargetRequestObject
} from '@adobe/react-native-acptarget'

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { AdobeTargetConstants } from './AdobeTargetOffers.constants'

import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

const startAdobeTargetOffers = (): any => {}
const stopAdobeTargetOffers = (): any => {}

const getAdobeTargetOffer = (mboxId: string, parameters: any) => {
  return new Promise(async (resolve, reject) => {
    const params = createACPTargetParameters(parameters)
    const request = await createACPRequestObject(
      mboxId,
      params,
      '',
      (error, content) => {
        if (error) {
          reject(error)
        } else {
          resolve(content)
        }
      }
    )

    var locationRequests = [request]

    retrieveTargetContent(locationRequests)
  })
}

const retrieveTargetContent = (targetRequest: any) => {
  ACPTarget.retrieveLocationContent(targetRequest)
}

const createACPTargetParameters = (parmtersJson: any) => {
  var parameters = new ACPTargetParameters(parmtersJson, null, null, null)
  return parameters
}

const createACPRequestObject = async (
  mboxID: string,
  parameters: ACPTargetParameters,
  fallbackResponse: String,
  response: (error: Error | null, content: string | null) => void
) => {
  mboxID = await getTargetTestCase(mboxID)
  return new ACPTargetRequestObject(
    mboxID,
    parameters,
    fallbackResponse,
    response
  )
}

const getTargetTestCase = async (mboxId: string) => {
  const testID = await EncryptedStorage.getItem(
    STORAGE_KEYS.selectedAdobeTestTarget
  )
  if (Config.IS_PRODUCTION !== 'true' && testID) {
    mboxId = mboxId + '_' + testID
  }

  return mboxId
}

const getAdobeTargetOffersWithGenericParameters = (
  mboxIds: string[],
  parameters: any
) => {
  return new Promise(async (resolve) => {
    var responseList: any[] = []

    for (const mboxId of mboxIds) {
      responseList.push(await getAdobeTargetOffer(mboxId, parameters))
    }
    resolve(responseList)
  })
}

// test function
// const testAdobeTargets = async () => {
//   const param = { umid: 'abcbc1f9-4285-4cbc-9543-9dcfb6b98ca2' }
//   try {
//     var result = await getAdobeTargetOffersWithGenericParameters(
//       [
//         AdobeTargetConstants.mbox_mv_app_offer_vov,
//         AdobeTargetConstants.mbox_mv_app_offer_bookable_tariff
//       ],
//       param
//     )
//     console.log('test content', result)
//   } catch (e: any) {
//     console.log('test error content', result)
//   }
// }

export {
  startAdobeTargetOffers,
  stopAdobeTargetOffers,
  getAdobeTargetOffersWithGenericParameters,
  getAdobeTargetOffer,
  createACPTargetParameters,
  createACPRequestObject,
  getTargetTestCase,
  retrieveTargetContent
}
