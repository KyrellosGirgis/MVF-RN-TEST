import BillingTestKeys from '@vfgroup-oneplatform/billing/Utils/BillingTestKeys'

import FoundationTestKeys from '@vfgroup-oneplatform/foundation/FoundationTestKeys'

import FrameworkTestKeys from '@vfgroup-oneplatform/framework/FrameworkTestKeys'
import LoginTestKeys from '@vfgroup-oneplatform/login/Utils/LoginTestKeys'

import MessageCenterTestKeys from '@vfgroup-oneplatform/message-center/Utils/MessageCenterTestKeys'
import OnBoardingTestKeys from '@vfgroup-oneplatform/onboarding/OnBoardingTestkeys'
import NetperformTestKeys from '@vfgroup-oneplatform/netperform/NetperformTestkeys'

import { testID } from 'App/Utils/Helpers/testId.helpers'

import FrameworkTestIds from 'App/Utils/testIds/framework.testIds'

import FoundationTestIds from 'App/Utils/testIds/foundation.testIds'

import BillingTestIds from 'App/Utils/testIds/billing.testIds'
import LoginTestIds from 'App/Utils/testIds/login.testIds'
import MessageCenterTestIDs from 'App/Utils/testIds/messageCenter.testIds'
import OnBoardingTestIds from 'App/Utils/testIds/onBoarding.testIds'
import NetperformTestIds from 'App/Utils/testIds/netperform.testIds'

const settingCoreTestIds = () => {
  exports.applyTestIDWrapper(BillingTestKeys, BillingTestIds)
  exports.applyTestIDWrapper(FoundationTestKeys, FoundationTestIds)
  exports.applyTestIDWrapper(FrameworkTestKeys, FrameworkTestIds)
  exports.applyTestIDWrapper(LoginTestKeys, LoginTestIds)
  exports.applyTestIDWrapper(MessageCenterTestKeys, MessageCenterTestIDs)
  exports.applyTestIDWrapper(OnBoardingTestKeys, OnBoardingTestIds)
  exports.applyTestIDWrapper(NetperformTestKeys, NetperformTestIds)
}

const applyTestIDWrapper = (
  coreTestIDsObject: { [key: string]: string },
  testIDsObject: { [key: string]: string }
) => {
  Object.keys(testIDsObject).forEach((key: string) => {
    testIDsObject[key] = testID(testIDsObject[key])
  })
  Object.assign(coreTestIDsObject, testIDsObject)
}

export { settingCoreTestIds, applyTestIDWrapper }
