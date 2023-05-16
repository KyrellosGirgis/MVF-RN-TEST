import TrayJson from './Tray.config'
import { mapCurrentSubscriptionsToExpandedProducts } from './Tray.helpers'

import { getOptionalNavigationSkeleton } from 'App/Services/DataLayer/Helpers/Dashboard/DashboardSkeleton.helpers'

type Props = {
  userAccountVBO: { [key: string]: unknown }
  isLoading: boolean
}

const mapOptionalNavigationToTrayItems = () => {
  const optionalNavigation = getOptionalNavigationSkeleton()

  return optionalNavigation?.map((optionalItem) => ({
    title: optionalItem.title,
    subTrayID: optionalItem.title,
    icon: optionalItem.iconSource,
    subTray: {
      subTrayItems: []
    },
    action: optionalItem.action
  }))
}

const getTrayData = ({ userAccountVBO, isLoading }: Props) => {
  return {
    ...TrayJson,
    optionalItems: mapOptionalNavigationToTrayItems(),
    products: {
      ...TrayJson.products,
      subTray: {
        ...TrayJson.products.subTray,
        subTrayItems: userAccountVBO
          ? Object.values(userAccountVBO?.subscriptions).flat(1)
          : [],
        expandedTrayItems: userAccountVBO
          ? mapCurrentSubscriptionsToExpandedProducts()
          : [],
        isLoading: isLoading,
        getCategoryName: (category: any) => category.name
      }
    }
  }
}

export { getTrayData, mapOptionalNavigationToTrayItems }
