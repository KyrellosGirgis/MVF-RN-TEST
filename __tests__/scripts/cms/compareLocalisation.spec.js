import Axios from 'axios'

import compareLocalisation from 'scripts/cms/compareLocalisation'

jest.mock('CMS/internationalisation_de_DE.json', () => {
  return {
    app_name: 'MeinVodafone',
    logout: 'Logout',
    logout_button: 'Ausloggen',
    logout_cancel_button: 'Abbrechen',
    logout_description:
      'Bist du sicher, dass du dich aus MeinVodafone abmelden willst?',
    login_title_text: 'MeinVodafone Login'
  }
})

jest.mock('CMS/internationalisation_en_GB.json', () => {
  return {
    app_name: 'MeinVodafone',
    logout: 'Logout',
    logout_cancel_button: 'Cancel',
    logout_description: 'Are you sure you want to log out of My Vodafone?',
    login_title_text: 'My Vodafone log in',
    leftOf: 'left of',
    bundle: 'bundle'
  }
})

const rootCMS = {
  app_package: {
    items: [
      {
        id: 'internationalisation',
        resource: 'https://mock/cms/internationalisation'
      }
    ]
  }
}

const internationalisationCMS = {
  internationalisation: {
    translation_items: [
      {
        locale: 'en',
        resource: 'https://mock/cms/internationalisation_en_GB'
      },
      {
        locale: 'de',
        resource: 'https://mock/cms/internationalisation_de_DE'
      }
    ]
  }
}

const remoteEN = {
  app_name: 'MeinVodafone',
  logout: 'Logout Now',
  logout_button: 'Log out',
  logout_cancel_button: 'Cancel',
  logout_description: 'Are you sure you want to log out of My Vodafone?',
  login_title_text: 'My Vodafone log in'
}

const remoteDE = {
  app_name: 'MeinVodafone',
  logout: 'Logout',
  logout_button: 'Ausloggen',
  logout_cancel_button: 'Abbrechen',
  logout_description:
    'Bist du sicher, dass du dich aus MeinVodafone abmelden willst?',
  login_title_text: 'MeinVodafone Login'
}

const localEN = {
  app_name: 'MeinVodafone',
  logout: 'Logout',
  logout_cancel_button: 'Cancel',
  logout_description: 'Are you sure you want to log out of My Vodafone?',
  login_title_text: 'My Vodafone log in',
  leftOf: 'left of',
  bundle: 'bundle'
}

const localDE = remoteDE

const expectedLocalisationVersions = {
  en: { remote: remoteEN, local: localEN },
  de: { remote: remoteDE, local: localDE }
}

describe('test compareLocalisation script functions ', () => {
  beforeAll(() => {
    process.env.CMS_BASE_URL = 'anyCms/url'
    compareLocalisation.logResults = jest.fn()

    Axios.get.mockImplementation((url) => {
      if (url.includes('/root')) {
        return Promise.resolve({
          data: rootCMS
        })
      } else if (url.includes('/internationalisation_de_DE')) {
        return Promise.resolve({
          data: remoteDE
        })
      } else if (url.includes('/internationalisation_en_GB')) {
        return Promise.resolve({
          data: remoteEN
        })
      } else {
        return Promise.resolve({
          data: internationalisationCMS
        })
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should getCMSBaseURL return default base url when no arguments passed', () => {
    const baseUrl = compareLocalisation.getCMSBaseURL()
    expect(baseUrl).toEqual('anyCms/url')
  })

  test('should getCMSBaseURL return expected result', () => {
    process.argv = ['CMS_BASE_URL=cmsBaseUrl']

    const baseUrl = compareLocalisation.getCMSBaseURL()
    expect(baseUrl).toEqual('cmsBaseUrl')
  })

  test('should getLocalisationVersions return the expected object structure', async () => {
    process.argv = ['CMS_BASE_URL=https://mock']

    const localisations = await compareLocalisation.getLocalisationVersions()
    expect(localisations).toEqual(expectedLocalisationVersions)
  })

  test('should compareLocalisation log expected differences and return expected statuses', () => {
    process.argv = ['CMS_BASE_URL=https://mock']
    console.log = jest.fn()
    console.error = jest.fn()
    const { remote, local } = expectedLocalisationVersions.en

    const status = compareLocalisation.compareLocalisation(
      { ...remote },
      { ...local },
      'en'
    )

    expect(console.log).toHaveBeenCalledWith(
      `Keys in remote CMS that is not in local CMS:\n\n`,
      {
        logout_button: 'Log out'
      }
    )

    expect(console.log).toHaveBeenCalledWith(
      `\n\nKeys in local CMS that is not in remote CMS:\n\n`,
      { leftOf: 'left of', bundle: 'bundle' }
    )

    expect(console.log).toHaveBeenCalledWith(
      `\n\nMismatched values between remote CMS and local CMS:\n\n`,
      {
        logout: { remote: 'Logout Now', local: 'Logout' }
      },
      '\n\n'
    )

    expect(status).toEqual(false)
  })

  test('should compareLocalisationFiles logs the expected differences', async () => {
    process.argv = ['CMS_BASE_URL=https://mock']
    console.log = jest.fn()
    console.error = jest.fn()
    await compareLocalisation.compareLocalisationFiles()

    expect(console.log).toHaveBeenCalledWith(
      `Keys in remote CMS that is not in local CMS:\n\n`,
      {
        logout_button: 'Log out'
      }
    )

    expect(console.log).toHaveBeenCalledWith(
      `\n\nKeys in local CMS that is not in remote CMS:\n\n`,
      { leftOf: 'left of', bundle: 'bundle' }
    )

    expect(console.log).toHaveBeenCalledWith(
      `\n\nMismatched values between remote CMS and local CMS:\n\n`,
      {
        logout: { remote: 'Logout Now', local: 'Logout' }
      },
      '\n\n'
    )
  })
})
