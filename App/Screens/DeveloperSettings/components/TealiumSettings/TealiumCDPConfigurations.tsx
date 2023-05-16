import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import TealiumCDPConfigurationsSections from './TealiumCDPConfigurationsSections.enum'

import TealiumEnvSwitcher from './TealiumEnvSwitcher'
import TealiumTraceID from './TealiumTraceSection'

const TealiumCDPConfigurations = forwardRef((_, ref) => {
  const tealiumCDPConfigurationsSectionsRefs = {
    [TealiumCDPConfigurationsSections.TealiumEnvSwitcher]: useRef(),
    [TealiumCDPConfigurationsSections.TealiumTraceID]: useRef()
  }

  const save = () => {
    Object.keys(tealiumCDPConfigurationsSectionsRefs).forEach((section) => {
      tealiumCDPConfigurationsSectionsRefs[section].current?.save()
    })
  }

  useImperativeHandle(ref, () => ({ save }))

  return (
    <>
      <TealiumEnvSwitcher
        ref={
          tealiumCDPConfigurationsSectionsRefs[
            TealiumCDPConfigurationsSections.TealiumEnvSwitcher
          ]
        }
      />

      <TealiumTraceID
        ref={
          tealiumCDPConfigurationsSectionsRefs[
            TealiumCDPConfigurationsSections.TealiumTraceID
          ]
        }
      />
    </>
  )
})

export default TealiumCDPConfigurations
