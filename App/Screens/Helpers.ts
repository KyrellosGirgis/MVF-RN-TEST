import { NavigationFunctions } from 'App/Containers'
import { UsageTile } from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/subscriptionUnbilledUsage.d'

const mapUsageTilesToTilesIds = (tiles: UsageTile[]) =>
  tiles.map((tile) => tile._id)

const navigateToDashboardScreen = () => NavigationFunctions.popToTop()

export { mapUsageTilesToTilesIds, navigateToDashboardScreen }
