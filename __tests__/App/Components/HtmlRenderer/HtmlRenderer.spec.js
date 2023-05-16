/* eslint-disable import/namespace */
import React from 'react'

import { create } from 'react-test-renderer'

import { store } from 'App/Redux'
import { HtmlRenderer } from 'App/Components'
import * as modalHelpers from 'App/Containers/AppModal/AppModal.helpers'
import * as WebViewScreenHelper from 'App/Screens/WebViewScreen/WebViewScreen.helper'

const props = {
  source: 'Html title',
  containerTestID: 'Html_Component_Wrapper',
  testID: 'Html_Component_Text',
  tooltipModalTitle: 'onboarding_bew_permissions_step_title'
}

describe('Html component', () => {
  beforeAll(() => {
    store.dispatch = jest.fn()
  })

  test('should render Html componnent successfully', () => {
    const element = create(<HtmlRenderer {...props} />)
    const htmlWrapper = element.root.findByProps({
      testID: 'Html_Component_Wrapper'
    })
    const htmlText = element.root.findByProps({
      testID: 'Html_Component_Text'
    })
    expect(htmlWrapper).toBeDefined()
    expect(htmlText.props.source).toBe(props.source)
  })

  test('should call showModal when press on anchorTag with type overlay', () => {
    const element = create(<HtmlRenderer {...props} />)
    const htmlWrapper = element.root.findByProps({
      testID: 'Html_Component_Wrapper'
    })
    const DummyComponent = () => <></>
    modalHelpers.showModal = jest.fn()
    htmlWrapper.children[0].props.children.props.renderers
      .a({
        DummyComponent,
        tnode: { attributes: { type: 'overlay' } }
      })
      .props.onPress()

    expect(modalHelpers.showModal).toHaveBeenCalled()
  })

  test('should call openWebView when press on anchorTag with href', () => {
    WebViewScreenHelper.openWebView = jest.fn()
    const element = create(<HtmlRenderer {...props} />)
    const htmlWrapper = element.root.findByProps({
      testID: 'Html_Component_Wrapper'
    })
    const DummyComponent = () => <></>

    htmlWrapper.children[0].props.children.props.renderers
      .a({
        DummyComponent,
        tnode: { attributes: { href: 'www.google.com' } }
      })
      .props.onPress()

    expect(WebViewScreenHelper.openWebView).toHaveBeenCalled()
  })

  test('should not call showModal when press on anchorTag with any other type ', () => {
    const element = create(<HtmlRenderer {...props} />)
    const htmlWrapper = element.root.findByProps({
      testID: 'Html_Component_Wrapper'
    })
    const DummyComponent = () => <></>
    modalHelpers.showModal = jest.fn()
    htmlWrapper.children[0].props.children.props.renderers
      .a({
        DummyComponent,
        tnode: { attributes: { type: 'text' } }
      })
      .props.onPress()

    expect(modalHelpers.showModal).not.toHaveBeenCalled()
  })
})
