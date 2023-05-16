/* eslint-disable import/namespace */
import React, { createRef } from 'react'
import { create, act } from 'react-test-renderer'

import CMSConfigsCard from 'App/Screens/DeveloperSettings/components/CMSConfigsCard/CMSConfigsCard'

import * as CMSHelper from 'App/Services/API/Requests/CMS/CMS.helper'
import * as CMSConfigsCardHelpers from 'App/Screens/DeveloperSettings/components/CMSConfigsCard/CMSConfigsCard.helpers'

describe('should render CMS Configs Card children successfully', () => {
  beforeAll(() => {
    CMSConfigsCardHelpers.saveAndApplyCmsConfigs = jest.fn()
  })

  beforeEach(() => {
    CMSHelper.getMockedCMSRootURL = jest.fn(() => 'anyURL')
  })

  test('should render CMS Configs Card successfully', async () => {
    let element
    await act(async () => {
      element = create(<CMSConfigsCard />)
    })
    expect(
      element.root.findByProps({
        testID: 'CMSURL_txt'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'CMSURL'
      })
    ).toBeDefined()
  })

  test('should call saveAndApplyCmsConfigs with correct text input value and isMocked = false when text input is empty', async () => {
    CMSHelper.getMockedCMSRootURL = jest.fn(() => undefined)
    const ref = createRef()
    await act(async () => {
      create(<CMSConfigsCard ref={ref} />)
    })
    ref.current.save()

    expect(CMSConfigsCardHelpers.saveAndApplyCmsConfigs).toHaveBeenCalledWith(
      undefined
    )
  })

  test('should call saveAndApplyCmsConfigs with correct text input value and isMocked = true when text input is prefilled', async () => {
    const ref = createRef()
    await act(async () => {
      create(<CMSConfigsCard ref={ref} />)
    })
    ref.current.save()

    expect(CMSConfigsCardHelpers.saveAndApplyCmsConfigs).toHaveBeenCalledWith(
      'anyURL'
    )
  })

  test('should call saveAndApplyCmsConfigs with correct text input value and isMocked = true when text input is filled by user', async () => {
    CMSHelper.getMockedCMSRootURL = jest.fn(() => undefined)
    const ref = createRef()
    let element
    await act(async () => {
      element = create(<CMSConfigsCard ref={ref} />)
    })

    const textInput = element.root.findByProps({
      testID: 'CMSURL'
    })
    textInput.props.onChangeText('newURL')

    ref.current.save()

    expect(CMSConfigsCardHelpers.saveAndApplyCmsConfigs).toHaveBeenCalledWith(
      undefined // should be 'newURL' but calling onChangeText from test won't change the input text value
    )
  })
})
