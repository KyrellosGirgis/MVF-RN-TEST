/* eslint-disable no-unused-vars */
interface AddOnDetailsScreenRouteProps {
  params: {
    addOnItem: any
    actionType: ADDONS_ACTIONS
    isOpenedThrowInLineContent: boolean
  }
}

enum ADDONS_ACTIONS {
  REMOVE = 'Remove',
  BUY = 'buy'
}
export { AddOnDetailsScreenRouteProps, ADDONS_ACTIONS }
