import { cmsActions } from 'App/Redux/reducers/cms.reducer'
import { store } from 'App/Redux'

describe('unit testing for cms reducer', () => {
  it('should set privacyCookiePermissionsVersion', () => {
    const expectedCookiePermissionsVersion = 2
    store.dispatch(
      cmsActions.setPrivacyCookiePermissionsVersion(
        expectedCookiePermissionsVersion
      )
    )
    const { privacyCookiePermissionsVersion } = store.getState().cms
    expect(privacyCookiePermissionsVersion).toEqual(
      expectedCookiePermissionsVersion
    )
  })

  it('should set DataPrivacyUrl', () => {
    const expectedDataPrivacyURL = 'https://anyhing.com/anything'
    store.dispatch(cmsActions.setDataPrivacyUrl(expectedDataPrivacyURL))
    const { dataPrivacyUrl } = store.getState().cms
    expect(dataPrivacyUrl).toEqual(expectedDataPrivacyURL)
  })

  it('should set Privacy attributes', () => {
    const expectedCookiePermissionsVersion = 2
    const expectedDataPrivacyURL = 'https://anyhing.com/anything'
    store.dispatch(
      cmsActions.setPrivacy({
        consent_version: expectedCookiePermissionsVersion,
        dataPrivacyUrl: expectedDataPrivacyURL
      })
    )
    const { privacyCookiePermissionsVersion, dataPrivacyUrl } =
      store.getState().cms
    expect(privacyCookiePermissionsVersion).toEqual(
      expectedCookiePermissionsVersion
    )
    expect(dataPrivacyUrl).toEqual(expectedDataPrivacyURL)
  })
})
