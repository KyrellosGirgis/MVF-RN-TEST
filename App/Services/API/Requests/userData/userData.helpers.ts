import _ from 'lodash'

import {
  CableSubscription,
  Cable,
  Mobile,
  UserAccountVBO,
  UserDataServicesTypes,
  Role,
  FixedNet,
  UnityMedia,
  MobileSubscription
} from './userData.d'

import {
  CableProduct,
  FixedNetProduct,
  MobileProduct,
  UnityMediaProduct
} from 'App/Services/AppUserData/appUserData.d'

import {
  removeKeysFromObject,
  replaceCountryCodeInMSISDN,
  translate
} from 'App/Utils/Helpers/generic.helpers'

const mapBEUserDataToAppUserData = ({
  userAccountVBO
}: {
  userAccountVBO: UserAccountVBO
}) => {
  const {
    mobile: mobileContracts,
    fixednet,
    cable,
    unitymedia
  }: UserAccountVBO = userAccountVBO

  const mobileSubscriptions =
    mobileContracts?.map(mapMobileContracts)?.flat(1) ?? []

  const cableSubscriptions =
    cable
      ?.map((cableItem: Cable) => cableItem?.subscription!)
      ?.flat(1)
      ?.filter(isValidSubscription)
      ?.map(mapToCableGenericSubscription) ?? []

  const fixednetSubscriptions =
    fixednet
      ?.filter(isValidSubscription)
      ?.map(mapToFixednetGenericSubscription) ?? []

  const unitymediaSubscriptions =
    unitymedia
      ?.filter(isValidSubscription)
      ?.map(mapToUnitymediaGenericSubscription) ?? []

  removeKeysFromObject(userAccountVBO, Object.keys(UserDataServicesTypes))
  userAccountVBO.subscriptions = {
    mobileSubscriptions,
    fixednetSubscriptions,
    cableSubscriptions,
    unitymediaSubscriptions
  }
}

const mapMobileContracts = (mobileContract: Mobile) => {
  if (!mobileContract?.contract?.subscription) {
    return []
  }
  filterSubscriptionsInMobileContract(mobileContract)
  injectMobileContractValuesInSubscriptions(mobileContract)
  return mobileContract?.contract?.subscription?.map(
    mapToMobileGenericSubscription
  )
}

const injectMobileContractValuesInSubscriptions = (mobileContract: Mobile) => {
  mobileContract.contract.subscription?.forEach((subscription) => {
    subscription.contractMboId = mobileContract.contract.mboId
    subscription.contractRole = mobileContract.contract.role
  })
}

const filterSubscriptionsInMobileContract = (mobileContract: Mobile) => {
  mobileContract.contract.subscription =
    mobileContract.contract.subscription?.filter(isValidSubscription)
}

const mapToMobileGenericSubscription = (
  mobileSubscription: MobileSubscription
): MobileProduct => {
  return {
    itemTitle: mobileSubscription?.mboName || 'Mobilfunk',
    itemSubTitle: replaceCountryCodeInMSISDN(
      mobileSubscription?.msisdn?.toString()
    ),
    itemImage: 'mobile_image',
    id: mobileSubscription?.msisdn?.toString(),
    type: UserDataServicesTypes.mobile,
    marketCode: mobileSubscription?.marketCode,
    ban: mobileSubscription?.ban,
    hasBanAccess: mobileSubscription.contractRole === Role.CustomerAccountAdmin,
    mboName: mobileSubscription?.mboName,
    mboId: mobileSubscription?.mboId,
    contractMboId: mobileSubscription.contractMboId,
    contractRole: mobileSubscription.contractRole
  }
}

const mapToCableGenericSubscription = (
  cableSubscription: CableSubscription
): CableProduct => {
  return {
    itemTitle: cableSubscription?.displayName || 'Internet_and_Festnetz',
    itemSubTitle: `${translate('kundennummer')}: ${
      cableSubscription?.id?.toString() || ''
    }`,
    itemImage: 'router_image',
    id: cableSubscription?.id?.toString(),
    type: UserDataServicesTypes.cable
  }
}

const mapToFixednetGenericSubscription = (
  fixedNetSubscription: FixedNet
): FixedNetProduct => {
  return {
    itemTitle: fixedNetSubscription?.mboName || 'Internet_and_Festnetz',
    itemSubTitle: `${translate('kundennummer')}: ${
      fixedNetSubscription?.acn?.toString() || ''
    }`,
    itemImage: 'router_image',
    id: fixedNetSubscription?.acn?.toString(),
    type: UserDataServicesTypes.fixednet
  }
}

const mapToUnitymediaGenericSubscription = (
  unitymediaSubscription: UnityMedia
): UnityMediaProduct => {
  return {
    itemTitle: unitymediaSubscription?.name || 'Kabel_Vertrag',
    itemSubTitle: `${translate('kundennummer')}: ${
      unitymediaSubscription?.accountNumber?.toString() || ''
    }`,
    itemImage: 'unityMedia_image',
    id: unitymediaSubscription?.accountNumber?.toString(),
    type: UserDataServicesTypes.unitymedia,
    region: unitymediaSubscription.region
  }
}

const isValidSubscription = (subscription: Object) =>
  !!subscription && !_.isEmpty(subscription)

const unhandledStatusCodesList = [401]

export { mapBEUserDataToAppUserData, unhandledStatusCodesList }
