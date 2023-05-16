import { store } from 'App/Redux'

const getOptionalNavigationSkeleton = () => {
  const { optionalNavigation } = store.getState().dashboardSkeleton || {}
  return optionalNavigation?.map(({ label, icon, action }) => ({
    title: label,
    iconSource: icon.href,
    action: action?.href
  }))
}

export { getOptionalNavigationSkeleton }
