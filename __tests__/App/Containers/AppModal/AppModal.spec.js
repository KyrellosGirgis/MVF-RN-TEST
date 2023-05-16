/* eslint-disable import/namespace */

import React from 'react'

import renderer, { act } from 'react-test-renderer'
import { Text } from 'react-native'

import * as modalHelpers from 'App/Containers/AppModal/AppModal.helpers'
import AppModal from 'App/Containers/AppModal/AppModal'
import { testID } from 'App/Utils/Helpers/testId.helpers'

describe('render AppModal component ', () => {
  test('should render AppModal component if showModal is true successfully', () => {
    const element = renderer.create(<AppModal />)
    act(() => {
      /* fire events that update state */
      modalHelpers.showModal({ title: 't', component: <Text /> })
    })
    expect(
      element.root.findByProps({
        testID: testID('AppModalContainer')
      })
    ).toBeDefined()
  })

  test('should set top margin of the Modal with 0 when isFullScreen', () => {
    const element = renderer.create(<AppModal />)
    act(() => {
      /* fire events that update state */
      modalHelpers.showModal({
        title: 't',
        component: <Text />,
        isFullScreen: true
      })
    })

    expect(
      element.root.findByProps({
        testID: testID('appModal')
      }).props.style[0].margin
    ).toEqual(0)
  })

  test('should render header of the Modal when there is a title', () => {
    const element = renderer.create(<AppModal />)
    act(() => {
      /* fire events that update state */
      modalHelpers.showModal({
        title: 't',
        component: <Text />
      })
    })
    expect(
      element.root.findByProps({
        testKey: testID('AppModalTitle')
      })
    ).toBeDefined()
    expect(
      element.root.findByProps({
        testKey: testID('AppModalTitle')
      }).props.i18nKey
    ).toEqual('t')
  })

  test('should invoke onDismiss when press on close icon', () => {
    modalHelpers.closeModal = jest.fn()
    const onDismiss = jest.fn()

    const element = renderer.create(<AppModal />)
    act(() => {
      /* fire events that update state */
      modalHelpers.showModal({
        title: 't',
        component: <Text />,
        onHeaderCloseButtonPress: onDismiss
      })
    })
    element.root
      .findByProps({
        testID: testID('AppModalHeaderCloseBtn')
      })
      .props.onPress()
    expect(onDismiss).toHaveBeenCalled()
  })
})
