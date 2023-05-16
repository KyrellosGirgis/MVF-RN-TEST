import { TrayTabsConfig } from 'App/Screens/HomeScreen/components/Tray/Tray.config'
import { Role } from 'App/Services/API/Requests/userData/userData.d'
import { translate } from 'App/Utils/Helpers/generic.helpers'

const actualMobileProduct = {
  mboId: 0,
  partyRoleId: 0,
  ban: 123456789,
  msisdn: 2345678890987,
  marketCode: 'MMC',
  subType: 'TN',
  role: 'SubscriptionAdmin',
  access: 'AccessSubscription',
  status: 'effective',
  registrationDate: '1970-01-01',
  isActiveContract: false,
  isFemtoSubscription: false,
  contractMboId: 0,
  contractRole: Role.CustomerAccountAdmin
}

const actualFixedNetProduct = {
  access: 'DSLSubaccountSubscription',
  acn: '115',
  isActiveContract: true,
  mboId: 777,
  partyRoleId: 777,
  registrationDate: '1970-01-01',
  role: 'SubscriptionAdmin',
  status: 'effective',
  subType: 'DSL',
  uoi: '9999'
}

const actualCableProduct = {
  hasCableMail: false,
  id: '1234',
  isActiveContract: true,
  isDefaultContract: true,
  displayName: 'Red Internet 25 Cable',
  subscription: [
    {
      activatedDate: '1970-01-01',
      id: '6666',
      type: 'KIP'
    }
  ]
}

const actualUnityMediaProduct = {
  access: 'Residential',
  accessGroups: ['DE_PROFILE', 'DE_ORION', 'DE_ADMIN'],
  accountNumber: 117,
  id: 6666,
  isActiveContract: true,
  isDefaultContract: true,
  name: 'Kabel-Vertrag-Unity.Media',
  partyRoleId: 0,
  region: 'NRW',
  registrationDate: '2021-03-26',
  role: 'AD',
  status: 'activated',
  subType: 'Unity-Media',
  subscription: [
    { code: 'A', name: 'Analog TV', status: 8 },
    { code: 'T', name: 'Telefon', status: 8 },
    { code: 'D', name: 'Digital TV', status: 1 },
    { code: 'I', name: 'Internet', status: 8 },
    { code: 'M', name: 'Mobilfunk', status: 8 }
  ]
}

const actualProductsObject = {
  products: {
    productsSubscriptions: {
      mobileSubscriptions: [actualMobileProduct],
      fixednetSubscriptions: [actualFixedNetProduct],
      unitymediaSubscriptions: [actualUnityMediaProduct],
      cableSubscriptions: [actualCableProduct]
    }
  }
}

const expectedMobileProduct = {
  itemTitle: 'Mobilfunk',
  itemSubTitle: '2345678890987',
  itemImage: 'mobile_image',
  id: '2345678890987',
  type: 'mobile',
  marketCode: 'MMC',
  ban: 123456789,
  hasBanAccess: true,
  mboName: undefined,
  mboId: 0,
  contractMboId: 0,
  contractRole: Role.CustomerAccountAdmin
}
const expectedFixedNetProduct = {
  itemTitle: 'Internet_and_Festnetz',
  itemSubTitle: `${translate('kundennummer')}: 115`,
  itemImage: 'router_image',
  id: '115',
  type: 'fixednet'
}

const expectedUnityMediaProduct = {
  itemImage: 'unityMedia_image',
  itemSubTitle: `${translate('kundennummer')}: 117`,
  itemTitle: 'Kabel-Vertrag-Unity.Media',
  id: '117',
  type: 'unitymedia',
  region: 'NRW'
}
const expectedCableProduct = {
  itemTitle: 'Red Internet 25 Cable',
  itemSubTitle: `${translate('kundennummer')}: 1234`,
  itemImage: 'router_image',
  id: '1234',
  type: 'cable'
}
const mappedAppUserDataObject = {
  appUserData: {
    userAccountVBO: {
      subscriptions: {
        mobileSubscriptions: [expectedMobileProduct],
        fixednetSubscriptions: [expectedFixedNetProduct],
        unitymediaSubscriptions: [expectedUnityMediaProduct],
        cableSubscriptions: [expectedCableProduct]
      }
    }
  }
}

const expectedProducts = {
  mobileSubscriptions: [expectedMobileProduct],
  fixednetSubscriptions: [expectedFixedNetProduct],
  unitymediaSubscriptions: [expectedUnityMediaProduct],
  cableSubscriptions: [expectedCableProduct]
}

const expectedMobileSubscriptionObject = {
  id: TrayTabsConfig.mobileSubscriptions.id,
  name: TrayTabsConfig.mobileSubscriptions.title,
  products: [expectedMobileProduct]
}

const expectedFixedNetSubscriptionObject = {
  id: TrayTabsConfig.fixednetSubscriptions.id,
  name: TrayTabsConfig.fixednetSubscriptions.title,
  products: [expectedFixedNetProduct]
}

const expectedCableSubscriptionObject = {
  id: TrayTabsConfig.cableSubscriptions.id,
  name: TrayTabsConfig.cableSubscriptions.title,
  products: [expectedCableProduct]
}

const expectedUnityMediaSubscriptionObject = {
  id: TrayTabsConfig.unitymediaSubscriptions.id,
  name: TrayTabsConfig.unitymediaSubscriptions.title,
  products: [expectedUnityMediaProduct]
}

const expectedExpandedTraySubscriptions = [
  expectedMobileSubscriptionObject,
  expectedFixedNetSubscriptionObject,
  expectedUnityMediaSubscriptionObject,
  expectedCableSubscriptionObject
]

export {
  mappedAppUserDataObject,
  actualMobileProduct,
  actualFixedNetProduct,
  actualCableProduct,
  actualUnityMediaProduct,
  actualProductsObject,
  expectedProducts,
  expectedMobileProduct,
  expectedCableProduct,
  expectedFixedNetProduct,
  expectedUnityMediaProduct,
  expectedMobileSubscriptionObject,
  expectedFixedNetSubscriptionObject,
  expectedCableSubscriptionObject,
  expectedUnityMediaSubscriptionObject,
  expectedExpandedTraySubscriptions
}
