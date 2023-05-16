const oidc_dummy_401 = {
  apis: {
    'DXL.billHistory': {
      baseURL: 'https://0ab3e6b7-58f0-4773-a1a1-d52ae10842b3.mock.pstmn.io',
      headers: {
        'x-mock-response-name': 'success-200-mint-start-dsl'
      }
    },
    'Mint.sessionStart': {
      baseURL: 'https://0ab3e6b7-58f0-4773-a1a1-d52ae10842b3.mock.pstmn.io',
      headers: {
        'x-mock-response-name': 'success-200-mint-start-dsl'
      }
    }
  },
  cmsFiles: {
    internationalisation: {
      resource:
        'https://am-vodafone.github.io/cms/mvf/configfiles/rn/op_733/internationalisation.json'
    }
  }
}

const MockedStubbingObject = {
  oidc_dummy_401
}

const mockIcon = {
  href: 'https://example.com/icon.png'
}

const mockAction = {
  href: 'https://example.com/action'
}

const mockBillingInformation = {
  amount: 99.99,
  currency: 'USD',
  date: '2022-12-31'
}

const mockMediumTile = {
  id: '12345',
  parent: 'abcde',
  rank: 1,
  type: 'type1',
  subType: 'subtype1',
  title: 'Example Medium Tile',
  description: 'This is an example medium tile.',
  icon: mockIcon,
  action: mockAction,
  billingInformation: mockBillingInformation
}

const mockMediumTilesJson = {
  mediumTiles: [mockMediumTile],
  _links: {
    self: {
      href: 'https://example.com/medium-tiles'
    }
  }
}

export { MockedStubbingObject, oidc_dummy_401, mockMediumTilesJson }
