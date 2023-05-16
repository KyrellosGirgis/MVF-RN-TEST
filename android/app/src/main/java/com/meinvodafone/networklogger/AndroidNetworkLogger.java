package com.meinvodafone.networklogger;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.net.VpnService;
import android.os.Handler;
import android.util.Log;

import androidx.activity.result.ActivityResult;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import com.emanuelef.remote_capture.CaptureService;
import com.emanuelef.remote_capture.ConnectionsRegister;
import com.emanuelef.remote_capture.PCAPdroid;
import com.emanuelef.remote_capture.interfaces.ConnectionsListener;
import com.emanuelef.remote_capture.model.ConnectionDescriptor;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.meinvodafone.OnActivityResultCallback;
import com.meinvodafone.rn.dev.MainActivity;

import java.util.ArrayList;

class AndroidNetworkLogger extends ReactContextBaseJavaModule implements ConnectionsListener, OnActivityResultCallback {

    AndroidNetworkLogger(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    Uri mPcapUri = null;
    PCAPdroid pcaPdroid;
    ArrayList<String> requestUrlArr = new ArrayList<>();

    @ReactMethod
    void clearNetworkLogs() {
        requestUrlArr.clear();
    }

    @ReactMethod
    void readNetworkLogs(final Promise promise) {
        ReactApplicationContext context = getReactApplicationContext();
        WritableArray writableArray = toWritableArray(requestUrlArr);
        promise.resolve(writableArray);
    }

    private WritableArray toWritableArray(ArrayList<String> requestUrlArr) {
        final WritableArray writableArray = Arguments.createArray();
        for (String requestUrl : requestUrlArr) {
            writableArray.pushString(requestUrl);
        }
        return writableArray;
    }

    @ReactMethod
    private void startLogging() {
        AppCompatActivity activity = (AppCompatActivity) getCurrentActivity();
        pcaPdroid = new PCAPdroid(activity.getApplication());
        MainActivity mainActivity = (MainActivity) getCurrentActivity();
        mainActivity.setOnActivityResultCallback(this);
        Intent vpnIntent = VpnService.prepare(activity);
        if (vpnIntent != null) {
            mainActivity.getmLauncher().launch(vpnIntent);
        } else {
            startCapture(activity);
        }
    }

    private void startCapture(Context context) {
        Intent intent = new Intent(context, CaptureService.class);
        ContextCompat.startForegroundService(context, intent);
        final Handler handler = new Handler();
        handler.postDelayed(() -> {
            mPcapUri = CaptureService.getPcapUri();
            ConnectionsRegister reg = CaptureService.getConnsRegister();
            reg.addListener(this);
        }, 300);

    }

    @ReactMethod
    private void stopLogging() {
        CaptureService.stopService();
        CaptureService.waitForCaptureStop();
    }

    @NonNull
    @Override
    public String getName() {
        return "AndroidNetworkLogger";
    }

    @Override
    public void connectionsChanges(int i) {

    }

    @Override
    public void connectionsAdded(int i, ConnectionDescriptor[] connectionDescriptors) {
        for (ConnectionDescriptor connectionDescriptor : connectionDescriptors) {
            try {
                String callingApp = getReactApplicationContext().getPackageManager()
                        .getNameForUid(connectionDescriptor.uid);
                if (!urlWithProtocol(connectionDescriptor).isEmpty() && callingApp != null
                        && callingApp.equals("com.meinvodafone.rn.dev"))
                    requestUrlArr.add(urlWithProtocol(connectionDescriptor));
            } catch (Exception e) {
                Log.e("LOGGER", "connectionsAddedException: " + e);
            }
        }
    }

    private String urlWithProtocol(ConnectionDescriptor connectionDescriptor) {
        String url;
        if (connectionDescriptor.l7proto.equals("HTTPS"))
            url = "https://" + connectionDescriptor.info;
        else if (connectionDescriptor.l7proto.equals("HTTP"))
            url = "http://" + connectionDescriptor.info;
        else
            url = connectionDescriptor.info;
        return url;
    }

    @Override
    public void connectionsRemoved(int i, ConnectionDescriptor[] connectionDescriptors) {

    }

    @Override
    public void connectionsUpdated(int[] ints) {

    }

    @Override
    public void onActivityResult(ActivityResult activityResult) {
        if (activityResult.getResultCode() == Activity.RESULT_OK) {
            startCapture(getCurrentActivity());
        }

    }
}