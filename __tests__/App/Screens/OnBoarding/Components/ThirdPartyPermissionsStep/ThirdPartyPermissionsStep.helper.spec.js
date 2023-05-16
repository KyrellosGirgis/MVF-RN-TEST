import { getThirdPartyPermissionsWithDefaultValue } from 'App/Screens/OnBoarding/Components/ThirdPartyPermissionsStep/ThirdPartyPermissionsStep.helper'

describe('Test ThirdPartyPermissionsStep Helper functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return the correct object initialized with the passed value', () => {
    expect(getThirdPartyPermissionsWithDefaultValue(false)).toStrictEqual({
      'LI-NBA': false,
      'LI-OM': false,
      'LI-OPT': false
    })

    expect(getThirdPartyPermissionsWithDefaultValue(true)).toStrictEqual({
      'LI-NBA': true,
      'LI-OM': true,
      'LI-OPT': true
    })
  })
})
