import { CommonActions, StackActions } from '@react-navigation/native'

import Navigation from '@vfgroup-oneplatform/foundation/Utils/Navigation'

import Routes from './Routes'

import { AppNavRef } from 'App/Containers/AppNavigation/AppNavigation'

const NavigationImplementations = {
  navigate: (routeName: string, params: Object = {}) => {
    AppNavRef.navigate(routeName, params)
  },

  goBack: () => {
    AppNavRef?.goBack()
  },

  navigateWithResetAction: (routeName: string, params: Object = {}) => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }]
    })
    AppNavRef.dispatch(resetAction)
    return resetAction
  },

  popToTop: () => {
    const state = AppNavRef.getState()
    const index = state.routes?.findIndex(
      (route: any) => route.name === Routes.HomeScreen
    )
    AppNavRef.dispatch(StackActions.pop(state.index - index))
  },

  reset: (actions, index: number) => {
    AppNavRef.dispatch({
      type: 'RESET',
      index,
      actions
    })
  },

  push: (routeName: string, params: Object) => {
    const pushAction = StackActions.push(routeName, params)
    AppNavRef.dispatch(pushAction)
  },

  pop: (number: number = 1) => {
    const popAction = StackActions.pop(number)
    AppNavRef.dispatch(popAction)
  },

  replace: (routeName: string, params: Object) => {
    const replaceAction = StackActions.replace(routeName, params)

    AppNavRef.dispatch(replaceAction)
  },

  getParam: (classInstance, paramName, defaultValue) => {
    return classInstance?.props?.route?.params?.hasOwnProperty(paramName)
      ? classInstance.props.route.params[paramName]
      : defaultValue
  },

  setParams: (paramsValue: Object) => {
    AppNavRef.setParams({ ...paramsValue })
  }
}

Navigation.instance = NavigationImplementations
export default NavigationImplementations
