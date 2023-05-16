package com.meinvodafone.rn.dev;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.provider.Settings;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DeviceSettings extends ReactContextBaseJavaModule {

    private ReactContext reactContext;

    public DeviceSettings(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNAndroidDeviceSettings";
    }

    @ReactMethod
    public void securitySettings() {
        openSettings(Settings.ACTION_SECURITY_SETTINGS,null);
     }

    @ReactMethod
    public void openPermissionSettings() {
        Uri uri = Uri.fromParts("package", reactContext.getPackageName(), null);
        openSettings(Settings.ACTION_APPLICATION_DETAILS_SETTINGS,uri);
    }

    private void openSettings(String action,Uri uri){
        Intent intent = new Intent(action);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
        if(uri!=null){
            intent.setData(uri);
        }
        if (intent.resolveActivity(reactContext.getPackageManager()) != null) {
            reactContext.startActivity(intent);
        }
    }

}