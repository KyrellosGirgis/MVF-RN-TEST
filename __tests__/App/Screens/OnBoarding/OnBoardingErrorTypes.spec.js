import {
  constructAndShowErrorTrayModal,
  handlersActions
} from 'App/Screens/OnBoarding/OnBoardingErrorTypes'
import * as modalHelpers from 'App/Containers/AppModal/AppModal.helpers'

describe('Onboarding Error Types test', () => {
  test('constructAndShowErrorTrayModal works successfullt', () => {
    // eslint-disable-next-line import/namespace
    modalHelpers.showModal = jest.fn()
    const errorObj = {
      title: 't',
      description: 'd',
      firstButtonHnadler: {
        title: 'c',
        handlerAction: handlersActions.customerSupportAction
      },
      secondButtonHandler: {
        title: 'b',
        handlerAction: handlersActions.backToLoginAction
      },
      withCloseButton: false
    }

    constructAndShowErrorTrayModal(errorObj)
    expect(modalHelpers.showModal).toHaveBeenCalled()
  })
})
