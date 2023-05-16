import crashlytics from '@react-native-firebase/crashlytics'

const startCrashlytics = async () => {
  enableCrashlytics()
}

const stopCrashlytics = async () => {
  if (crashlytics().isCrashlyticsCollectionEnabled) {
    enableCrashlytics(false)
  }
}

const enableCrashlytics = async (enable: boolean = true) =>
  await crashlytics().setCrashlyticsCollectionEnabled(enable)

export { startCrashlytics, stopCrashlytics }
