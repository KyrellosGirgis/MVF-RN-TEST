import React from 'react'

import renderer from 'react-test-renderer'

import CoreShimmer from '@vfgroup-oneplatform/foundation/Components/Shimmer'

import ShimmerScreen from 'App/Components/ShimmerScreen/ShimmerScreen'

const props = {
  title: 'any title',
  testID: 'anyTestId',
  shimmerContainerTestID: 'anyConntainerTestId',
  loadingConfig: [],
  onClose: jest.fn()
}

describe('Test ShimmerScreen component ', () => {
  test('should render ShimmerScreen components successfully', () => {
    const element = renderer.create(<ShimmerScreen {...props} />)
    const VFScreen = element.root.findByProps({
      testID: 'anyTestId'
    })

    const shimmerContainer = element.root.findByProps({
      testID: 'anyConntainerTestId'
    })

    const coreShimmer = element.root.findAllByType(CoreShimmer)[0]
    expect(VFScreen).toBeDefined()
    expect(shimmerContainer).toBeDefined()
    expect(coreShimmer).toBeDefined()
  })
})
