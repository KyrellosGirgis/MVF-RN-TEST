const mockedCurrentlySubscriptionObject = {
  ban: 112515450,
  type: 'mobile',
  id: 4915202824079,
  marketCode: 'MMC'
}

const mockedSelectedBEWPermissions = {
  shouldShowBEWDEV: true,
  shouldShowBEWADV: true,
  shouldShowNetperform: true,
  originalDEV: true,
  originalADV: true,
  advBEWVersion: '4',
  devBEWVersion: '4'
}

const expectedSelectedBEWPermissions = {
  bewVersion: 'V44',
  permissionList: [
    {
      permissionId: 'Original_DEV',
      permissionValue: true
    },
    {
      permissionId: 'Original_ADV',
      permissionValue: true
    },
    {
      permissionId: 'DEV',
      permissionValue: true
    },
    {
      permissionId: 'ADV',
      permissionValue: true
    }
  ]
}

const expectedSelectedBEWPermissionsWithNullValues = {
  bewVersion: 'V44',
  permissionList: [
    {
      permissionId: 'Original_DEV',
      permissionValue: true
    },
    {
      permissionId: 'Original_ADV',
      permissionValue: true
    },
    {
      permissionId: 'DEV',
      permissionValue: null
    },
    {
      permissionId: 'ADV',
      permissionValue: null
    }
  ]
}

const expectedGetBEWPermissionsData = {
  customerPartyVBO: [
    {
      type: 'mobile',
      details: {
        accountId: '112515450',
        msisdn: '491622022786',
        marketCode: 'MMC'
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
              'Ja, ich willige ein, dass die Vodafone-Unternehmen[1] meine Nutzungsdaten[4], Standortdaten und sonstigen Verkehrsdaten[5] verwenden und untereinander austauschen, um ihre Telemedien- und Telekommunikationsdienste für mich bedarfsgerecht und individuell zu gestalten, zu vermarkten sowie Dienste mit Zusatznutzen für mich bereitzustellen. Ich kann meine Einwilligung jederzeit ganz oder teilweise mit Wirkung für die Zukunft widerrufen.          --          [1]Vodafone-Unternehmen: Vodafone GmbH, Ferdinand-Braun-Platz 1, 40549 Düsseldorf, Vodafone Deutschland GmbH, Betastraße 6-8, 85774 Unterföhring sowie Vodafone West GmbH, Vodafone Hessen GmbH & Co. KG, Vodafone BW GmbH, Vodafone NRW GmbH, alle Aachener Str. 746-750, 50933 Köln.          [4]Nutzungsdaten: Informationen über Art, Umfang und Zeitpunkt der Nutzung von Telemediendiensten. Dies sind insbesondere (a) TV-, Multimedia- und Entertainment-Dienste, (b) Webseiten von Vodafone und (c) Online-Inhalte von Vodafone, die auf Web-seiten von Kooperations- und Werbepartnern angezeigt werden. Die Daten identifizieren mich oder mein Gerät direkt und sind zum Teil in meinem Gerät gespeichert, z.B. als Cookies.          [5]Verkehrsdaten: Daten, die bei der Erbringung eines Telekommunikationsdienstes (wie SMS, Telefon & Internet) erhoben, verarbeitet und genutzt werden, z.B. Art des genutzten Telekommunikationsdienstes, Anfang, Ende und Dauer der Verbindungen, das genutzte Datenvolumen, Geräte oder Anschlüsse sowie weitere Verkehrsdaten, die erhoben werden, auch wenn mein Gerät inaktiv ist (z.B. Signalisierungsdaten). Vodafone speichert und nutzt meine Verkehrsdaten einschließlich der Standortdaten maximal 6 Monate.'
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

const expectedPostBEWPermissionsData = {
  customerPartyVBO: [
    {
      type: 'mobile',
      details: {
        marketCode: 'MMC',
        accountId: '114864896'
      },
      marketingPreferences: {
        permissionsList: [
          {
            newPermissionValue: 'N',
            serviceId: 'GENE',
            permissionId: 'DEV',
            bewVersion: 4
          },
          {
            newPermissionValue: 'Y',
            serviceId: 'GENE',
            permissionId: 'ADV',
            bewVersion: 4
          }
        ]
      }
    }
  ]
}
export {
  mockedCurrentlySubscriptionObject,
  expectedGetBEWPermissionsData,
  mockedSelectedBEWPermissions,
  expectedPostBEWPermissionsData,
  expectedSelectedBEWPermissions,
  expectedSelectedBEWPermissionsWithNullValues
}
