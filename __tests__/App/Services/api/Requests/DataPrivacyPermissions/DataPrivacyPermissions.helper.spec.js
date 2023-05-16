/* eslint-disable import/namespace */
import {
  mapBEWSelectionsToRequestBody,
  getPrivacyPermissionsStatusFromBE
} from 'App/Services/API/Requests/DataPrivacyPermissions/DataPrivacyPermissions.helpers'

import {
  expectedSelectedBEWPermissions,
  mockedSelectedBEWPermissions,
  expectedSelectedBEWPermissionsWithNullValues
} from '__tests__/App/APIsDataMocks/BEWPermissionsMockedData'
import * as BEWPermssions from 'App/Services/API/Requests/DataPrivacyPermissions/BEWPermissions'
import {
  UserDataServicesTypes,
  MarketCode
} from 'App/Services/API/Requests/userData/userData.d'
import { store } from 'App/Redux'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { DATA_PRIVACY_PERMISSIONS } from 'App/Services/API/Requests/DataPrivacyPermissions/DataPrivacyPermissions.constants'
import { NetperformUserStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.constants'
import * as NetperformSDKServices from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.helper'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    getHashedMintUserId: jest.fn(() => '9876')
  }
})

jest.mock('App/Services/API/Requests/DataPrivacyPermissions/BEWPermissions')

const response = {
  customerPartyVBO: [
    {
      type: UserDataServicesTypes.mobile,
      details: {
        accountId: '112515450',
        msisdn: '491622022786',
        marketCode: MarketCode.MMC
      },
      marketingPreferences: {
        permissionStatus: 'Confirmed',
        permissionsList: [
          {
            permissionId: 'DEV',
            bewText:
              'Ja, ich willige ein, dass die Vodafone-Unternehmen[1] meine Nutzungsdaten[4], Standortdaten und sonstigen Verkehrsdaten[5] verwenden und untereinander austauschen, um ihre Telemedien- und Telekommunikationsdienste für mich bedarfsgerecht und individuell zu gestalten, zu vermarkten sowie Dienste mit Zusatznutzen für mich bereitzustellen. Ich kann meine Einwilligung jederzeit ganz oder teilweise mit Wirkung für die Zukunft widerrufen.          --          [1]Vodafone-Unternehmen: Vodafone GmbH, Ferdinand-Braun-Platz 1, 40549 Düsseldorf, Vodafone Deutschland GmbH, Betastraße 6-8, 85774 Unterföhring sowie Vodafone West GmbH, Vodafone Hessen GmbH & Co. KG, Vodafone BW GmbH, Vodafone NRW GmbH, alle Aachener Str. 746-750, 50933 Köln.          [4]Nutzungsdaten: Informationen über Art, Umfang und Zeitpunkt der Nutzung von Telemediendiensten. Dies sind insbesondere (a) TV-, Multimedia- und Entertainment-Dienste, (b) Webseiten von Vodafone und (c) Online-Inhalte von Vodafone, die auf Web-seiten von Kooperations- und Werbepartnern angezeigt werden. Die Daten identifizieren mich oder mein Gerät direkt und sind zum Teil in meinem Gerät gespeichert, z.B. als Cookies.          [5]Verkehrsdaten: Daten, die bei der Erbringung eines Telekommunikationsdienstes (wie SMS, Telefon & Internet) erhoben, verarbeitet und genutzt werden, z.B. Art des genutzten Telekommunikationsdienstes, Anfang, Ende und Dauer der Verbindungen, das genutzte Datenvolumen, Geräte oder Anschlüsse sowie weitere Verkehrsdaten, die erhoben werden, auch wenn mein Gerät inaktiv ist (z.B. Signalisierungsdaten). Vodafone speichert und nutzt meine Verkehrsdaten einschließlich der Standortdaten maximal 6 Monate.',
            bewVersion: 4,
            bewEffectiveDate: '2020-04-16'
          },
          {
            permissionId: 'ADV',
            bewText:
              'Ja, ich willige ein, dass die Vodafone-Unternehmen[1], auch wechselseitig füreinander, mich telefonisch und per elektronischer Post (z.B. E-Mail, Messenger, SMS und MMS) bezüglich Produkten und Dienstleistungen[3] zu Werbezwecken und zur Marktforschung kontaktieren. Ich kann meine Einwilligung jederzeit ganz oder teilweise mit Wirkung für die Zukunft widerrufen.          --          [1]Vodafone-Unternehmen: Vodafone GmbH, Ferdinand-Braun-Platz 1, 40549 Düsseldorf, Vodafone Deutschland GmbH, Betastraße 6-8, 85774 Unterföhring sowie Vodafone West GmbH, Vodafone Hessen GmbH & Co. KG, Vodafone BW GmbH, Vodafone NRW GmbH, alle Aachener Str. 746-750, 50933 Köln.          [3]Produkte und Dienstleistungen: Aus den Bereichen Mobilfunk, Internet & Festnetz, TV, Multimedia und Entertainment, Internet of Things (IoT) und Cloud-/Hosting Dienste sowie dazugehörige Hardware und Software.',
            bewVersion: 4,
            bewEffectiveDate: '2020-04-16'
          }
        ],
        permissionBEWReferenceDetails: [
          {
            permissionId: 'ADV',
            serviceId: 'GENE',
            effectiveDate: '2020-04-16',
            bewVersion: 4,
            bewText:
              'Ja, ich willige ein, dass die Vodafone-Unternehmen[1], auch wechselseitig füreinander, mich telefonisch und per elektronischer Post (z.B. E-Mail, Messenger, SMS und MMS) bezüglich Produkten und Dienstleistungen[3] zu Werbezwecken und zur Marktforschung kontaktieren. Ich kann meine Einwilligung jederzeit ganz oder teilweise mit Wirkung für die Zukunft widerrufen.          --          [1]Vodafone-Unternehmen: Vodafone GmbH, Ferdinand-Braun-Platz 1, 40549 Düsseldorf, Vodafone Deutschland GmbH, Betastraße 6-8, 85774 Unterföhring sowie Vodafone West GmbH, Vodafone Hessen GmbH & Co. KG, Vodafone BW GmbH, Vodafone NRW GmbH, alle Aachener Str. 746-750, 50933 Köln.          [3]Produkte und Dienstleistungen: Aus den Bereichen Mobilfunk, Internet & Festnetz, TV, Multimedia und Entertainment, Internet of Things (IoT) und Cloud-/Hosting Dienste sowie dazugehörige Hardware und Software.'
          },
          {
            permissionId: 'DEV',
            serviceId: 'GENE',
            effectiveDate: '2020-04-16',
            bewVersion: 4,
            bewText:
              'Ja, ich willige ein, dass die Vodafone-Unternehmen[1], auch wechselseitig füreinander, mich telefonisch und per elektronischer Post (z.B. E-Mail, Messenger, SMS und MMS) bezüglich Produkten und Dienstleistungen[3] zu Werbezwecken und zur Marktforschung kontaktieren. Ich kann meine Einwilligung jederzeit ganz oder teilweise mit Wirkung für die Zukunft widerrufen.          --          [1]Vodafone-Unternehmen: Vodafone GmbH, Ferdinand-Braun-Platz 1, 40549 Düsseldorf, Vodafone Deutschland GmbH, Betastraße 6-8, 85774 Unterföhring sowie Vodafone West GmbH, Vodafone Hessen GmbH & Co. KG, Vodafone BW GmbH, Vodafone NRW GmbH, alle Aachener Str. 746-750, 50933 Köln.          [3]Produkte und Dienstleistungen: Aus den Bereichen Mobilfunk, Internet & Festnetz, TV, Multimedia und Entertainment, Internet of Things (IoT) und Cloud-/Hosting Dienste sowie dazugehörige Hardware und Software.'
          }
        ],
        showBEW_DEV: true,
        showBEW_ADV: true,
        Original_DEV: false,
        Original_ADV: false
      }
    }
  ]
}

const mockBEWAxios = (shouldSuccessService = true) => {
  BEWPermssions.loadBEWPermissions.mockImplementation(() =>
    shouldSuccessService ? response : Promise.reject('error')
  )
}

describe('Test BEWPermissions helper functions', () => {
  beforeAll(() => {
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => ({
      [NetperformUserStatus.status]: true
    }))
    NetperformSDKServices.updateNetperformSDKStatus = jest.fn()
    store.getState = () => ({
      appUserData: {
        currentlyActiveSubscription: { type: 'mobile' }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Test map with success data', async () => {
    const actualData = mapBEWSelectionsToRequestBody({
      ...mockedSelectedBEWPermissions,
      [DATA_PRIVACY_PERMISSIONS.DEV]: true,
      [DATA_PRIVACY_PERMISSIONS.ADV]: true
    })
    expect(actualData).toEqual(expectedSelectedBEWPermissions)
  })

  it('should mapBEWSelectionsToRequestBody return the expected result when not showing adv and dev', async () => {
    const actualData = mapBEWSelectionsToRequestBody({
      ...mockedSelectedBEWPermissions,
      shouldShowBEWDEV: false,
      shouldShowBEWADV: false,
      [DATA_PRIVACY_PERMISSIONS.DEV]: true,
      [DATA_PRIVACY_PERMISSIONS.ADV]: true
    })
    expect(actualData).toEqual(expectedSelectedBEWPermissionsWithNullValues)
  })

  test('Test BEW Permissions getPrivacyPermissionsStatusFromBE successfully when Service success when mobile subscription and save it to redux', async () => {
    mockBEWAxios()
    const expectedObj = {
      shouldShowBEWADV: true,
      shouldShowBEWDEV: true,
      shouldShowNetperform: false,
      originalDEV: false,
      originalADV: false,
      advBEWVersion: 4,
      devBEWVersion: 4
    }
    const result = await getPrivacyPermissionsStatusFromBE()
    expect(result).toEqual(expectedObj)
  })

  test('Test BEW Permissions Create Object successfully when Service success when fixednet subscription', async () => {
    mockBEWAxios()

    store.getState = () => ({
      appUserData: {
        currentlyActiveSubscription: { type: 'fixednet' }
      }
    })
    const expectedObj = {
      shouldShowBEWADV: true,
      shouldShowBEWDEV: true,
      shouldShowNetperform: false,
      originalDEV: false,
      originalADV: false,
      advBEWVersion: 4,
      devBEWVersion: 4
    }
    const result = await getPrivacyPermissionsStatusFromBE()
    expect(result).toEqual(expectedObj)
  })

  test('should getPrivacyPermissionsStatusFromBE save correct object in redux when subscription type is cable', async () => {
    mockBEWAxios()
    store.getState = () => ({
      appUserData: {
        currentlyActiveSubscription: { type: 'cable' }
      }
    })

    const result = await getPrivacyPermissionsStatusFromBE()
    expect(result).toEqual({ shouldShowNetperform: false })
  })

  test('should getPrivacyPermissionsStatusFromBE save correct object in redux when service fails', async () => {
    mockBEWAxios(false)

    const result = await getPrivacyPermissionsStatusFromBE()
    expect(result).toEqual({ shouldShowNetperform: false })
  })

  test('should getPrivacyPermissionsStatusFromBE call updateNetperformSDKStatus', async () => {
    const netperformStatus = {
      [NetperformUserStatus.status]: true
    }
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => netperformStatus)
    mockBEWAxios()

    await getPrivacyPermissionsStatusFromBE()
    expect(
      NetperformSDKServices.updateNetperformSDKStatus
    ).toHaveBeenCalledWith(netperformStatus)
  })
})
