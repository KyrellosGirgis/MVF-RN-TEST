import { cloneDeep } from 'lodash'

import { ConfigurationType } from './Configuration.d'

const excludeSettingItem = (
  configuration: ConfigurationType[],
  nameToBeExcluded: string
) => {
  const config = cloneDeep(configuration)
  config[0].items = config[0].items.filter(
    (item: { id: string }) => item.id !== nameToBeExcluded
  )
  return config
}

export { excludeSettingItem }
