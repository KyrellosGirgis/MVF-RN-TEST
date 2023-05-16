#import "AppDelegate.h"
#import <Firebase.h>

#import "ACPCore.h"
#import "ACPTarget.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <React/RCTAppSetupUtils.h>

#import "ReactNativeConfig.h"
#import "trustKitConfigs.h"
#import <Keys/MeinVodafoneKeys.h>
#import <React/RCTLog.h>

#import "disableBackup.h"
#import <CodePush/CodePush.h>
#import <React/RCTLinkingManager.h>
#import <GoogleMaps/GoogleMaps.h>

#if RCT_NEW_ARCH_ENABLED
#import <React/CoreModulesPlugins.h>
#import <React/RCTCxxBridgeDelegate.h>
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <ReactCommon/RCTTurboModuleManager.h>

#import <react/config/ReactNativeConfig.h>

@interface AppDelegate () <RCTCxxBridgeDelegate, RCTTurboModuleManagerDelegate> {
  RCTTurboModuleManager *_turboModuleManager;
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
}
@end
#endif



@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    RCTAppSetupPrepareApp(application);

    [FIRApp configure];
    bool enableCertPinning = [[ReactNativeConfig envFor:@"ENABLE_CERT_PINNING"] isEqual:@"true"] ? true : false;

    if (enableCertPinning) {
        [trustKitConfigs  configureTrustKit];
    }

    MeinVodafoneKeys* appKeys = [[MeinVodafoneKeys alloc] init];

    NSString *stringifiedKeys = [appKeys.stringifiedKeys stringByReplacingOccurrencesOfString:@"\\" withString:@"\""];
    NSDictionary *props = @{@"keys" : stringifiedKeys};

    NSData *data = [stringifiedKeys dataUsingEncoding:NSUTF8StringEncoding];
    id json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];

    RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

    #if RCT_NEW_ARCH_ENABLED
    _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
    _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();
    _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);
    _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc] initWithBridge:bridge contextContainer:_contextContainer];
    bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;
    #endif

    UIView *rootView = RCTAppSetupDefaultRootView(bridge, @"MeinVodafone", props);

    if (@available(iOS 13.0, *)) {
        rootView.backgroundColor = [UIColor systemBackgroundColor];
    } else {
        rootView.backgroundColor = [UIColor whiteColor];
    }

    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:0.0f blue:0.0f alpha:1];
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];

    NSArray *libraryDirectoryPaths = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES);
    NSArray *documentDirectoryPaths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);

    [disableBackup excludingFromBackup:(libraryDirectoryPaths)];
    [disableBackup excludingFromBackup:(documentDirectoryPaths)];
    [GMSServices provideAPIKey:[json objectForKey:@"googleMapsApiKey"]];
    [self initAdobeSdk:application];
    return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
    bool enableCodePush = [[ReactNativeConfig envFor:@"ENABLE_CODE_PUSH"] isEqual:@"true"] ? true : false;

    #if DEBUG
      return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
    #else
        if (enableCodePush){
            return [CodePush bundleURL];
        }
        else{
            return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
        }
    #endif
}

#if RCT_NEW_ARCH_ENABLED

#pragma mark - RCTCxxBridgeDelegate

- (std::unique_ptr<facebook::react::JSExecutorFactory>)jsExecutorFactoryForBridge:(RCTBridge *)bridge
{
  _turboModuleManager = [[RCTTurboModuleManager alloc] initWithBridge:bridge
                                                             delegate:self
                                                            jsInvoker:bridge.jsCallInvoker];
  return RCTAppSetupDefaultJsExecutorFactory(bridge, _turboModuleManager);
}

#pragma mark RCTTurboModuleManagerDelegate

- (Class)getModuleClassFromName:(const char *)name
{
  return RCTCoreModulesClassProvider(name);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                      jsInvoker:(std::shared_ptr<facebook::react::CallInvoker>)jsInvoker
{
  return nullptr;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const std::string &)name
                                                     initParams:
                                                         (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return nullptr;
}

- (id<RCTTurboModule>)getModuleInstanceFromClass:(Class)moduleClass
{
  return RCTAppSetupDefaultModuleFromClass(moduleClass);
}

#endif

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
    return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
    return [RCTLinkingManager application:application
                     continueUserActivity:userActivity
                       restorationHandler:restorationHandler];
}

- (void)initAdobeSdk:(UIApplication *)application
{
  @try{
    [ACPCore setLogLevel:ACPMobileLogLevelVerbose];
    [ACPCore configureWithAppId:[ReactNativeConfig envFor:@"ADOBE_CORE_KEY"]];
    [ACPTarget registerExtension];
    [ACPCore setWrapperType:ACPMobileWrapperTypeReactNative];
    
    const UIApplicationState appState = application.applicationState;
    [ACPCore start:^{
      // only start lifecycle if the application is not in the background
      if (appState != UIApplicationStateBackground) {
        [ACPCore lifecycleStart:nil];
      }
    }];
  }
  @catch(NSException *e){
    NSLog(@"Adobe error %@", e.reason);
  }
}

@end
