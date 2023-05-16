package com.meinvodafone.rn.dev;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.hidesecrets.Secrets;
import com.meinvodafone.OnActivityResultCallback;
import com.meinvodafone.rn.dev.BuildConfig;
import com.meinvodafone.rn.dev.Utils;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends ReactActivity {
    private ActivityResultLauncher mLauncher;
    private OnActivityResultCallback onActivityResultCallback;

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule
     * rendering of the component.
     *
     * @return
     */

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Nullable
            @Override
            protected Bundle getLaunchOptions() {
                Bundle bundle = new Bundle();
                String stringifiedKeys = new Secrets().getStringifiedKeys("com.hidesecrets");
                bundle.putString("keys", stringifiedKeys);
                return bundle;
            }
        };
    }

    @Override
    protected String getMainComponentName() {
        return "MeinVodafone";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Utils.initC(this);

        if (BuildConfig.ENABLE_DEBUG_TOOLS == "true") {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG);
            }
            mLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                    (ActivityResultCallback<ActivityResult>) result -> {
                        if (onActivityResultCallback != null)
                            onActivityResultCallback.onActivityResult(result);
                    });
        }

        super.onCreate(null);
    }

    public void setOnActivityResultCallback(OnActivityResultCallback onActivityResultCallback) {
        this.onActivityResultCallback = onActivityResultCallback;
    }

    public ActivityResultLauncher<Intent> getmLauncher() {
        return mLauncher;
    }

  /**
	* Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and	19	   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
	* you can specify the rendered you wish to use (Fabric or the older renderer).	20	   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
	* (Paper).
	*/
  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }
    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }
}
