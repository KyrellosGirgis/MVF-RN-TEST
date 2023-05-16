import React from 'react'

import { create } from 'react-test-renderer'

import Tooltip from 'App/Components/HtmlRenderer/Components/Tooltip/Tooltip'

const props = {
  title: 'tooltip title',
  description: 'tooltip description'
}

describe('Tooltip component', () => {
  test('should render Tooltip componnent successfully', () => {
    const element = create(<Tooltip {...props} />)
    const tooltipWrapper = element.root.findByProps({
      testID: 'Tooltip_Component_Wrapper'
    })
    const tooltipTitle = element.root.findByProps({
      testID: 'Tooltip_Component_Title'
    }).props
    const tooltipDescriptionScrollView = element.root.findByProps({
      testID: 'Tooltip_Componennt_Body_Wrapper'
    }).props
    const tooltipDescription = element.root.findByProps({
      testID: 'Tooltip_Componennt_Body_Text'
    }).props

    expect(tooltipWrapper).toBeDefined()
    expect(tooltipTitle.i18nKey).toBe('tooltip title')
    expect(tooltipDescriptionScrollView).toBeDefined()
    expect(tooltipDescription.i18nKey).toBe('tooltip description')
  })
})
