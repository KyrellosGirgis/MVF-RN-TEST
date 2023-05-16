package com.meinvodafone.rn.dev;

import android.app.Application;

import com.adobe.marketing.mobile.AdobeCallback;
import com.adobe.marketing.mobile.InvalidInitException;
import com.adobe.marketing.mobile.LoggingMode;
import com.adobe.marketing.mobile.MobileCore;
import com.adobe.marketing.mobile.Target;
import com.adobe.marketing.mobile.WrapperType;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.soloader.SoLoader;
import com.meinvodafone.rn.dev.BuildConfig;
import com.meinvodafone.rn.dev.newarchitecture.MainApplicationReactNativeHost;
import com.microsoft.codepush.react.CodePush;
import com.meinvodafone.rn.dev.ExitAppModulePackage;
import com.meinvodafone.rn.dev.DeviceSettingsPackage;
import com.meinvodafone.rn.dev.MVFClientFactory;

import java.lang.reflect.Constructor;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private static final String ANDROID_NETWORK_LOGGER_PACKAGE = "com.meinvodafone.networklogger.AndroidNetworkLoggerPackage";

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            if (BuildConfig.ENABLE_CODE_PUSH == "true") {
                return CodePush.getJSBundleFile();
            }
            return super.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            if (BuildConfig.ENABLE_DEBUG_TOOLS == "true")
                packages.add(getReactPackageByClassName(ANDROID_NETWORK_LOGGER_PACKAGE));
            packages.add(new ExitAppModulePackage());
            packages.add(new DeviceSettingsPackage());
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    private final ReactNativeHost mNewArchitectureNativeHost =
      new MainApplicationReactNativeHost(this);

    @Override
    public ReactNativeHost getReactNativeHost() {
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            return mNewArchitectureNativeHost;
        } else {
            return mReactNativeHost;
        }
    }

    @Override
    public void onCreate() {
        super.onCreate();
        // If you opted-in for the New Architecture, we enable the TurboModule system
        ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        initAdobeCoreSdk();
        SoLoader.init(this, false);
        attachInterceptor();
    }

    private void initAdobeCoreSdk() {
        MobileCore.setApplication(this);
        MobileCore.setLogLevel(LoggingMode.DEBUG);
        try {
            Target.registerExtension();
            MobileCore.setWrapperType(WrapperType.REACT_NATIVE);
            MobileCore.start(o -> MobileCore.configureWithAppID(BuildConfig.ADOBE_CORE_KEY));
        } catch (InvalidInitException e) {
            e.printStackTrace();
        }
    }

    private ReactPackage getReactPackageByClassName(String className) {
        try {
            Class<?> ex = Class.forName(className);
            Constructor<?> constructor = ex.getConstructor();
            return (ReactPackage) constructor.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private void attachInterceptor() {
        try {
            OkHttpClientProvider.setOkHttpClientFactory(new MVFClientFactory(getApplicationContext()));
        } catch (Exception e) {
        }
    }
}
