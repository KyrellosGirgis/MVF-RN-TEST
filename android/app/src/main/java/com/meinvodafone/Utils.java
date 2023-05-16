package com.meinvodafone.rn.dev;

import android.content.res.Resources;
import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import java.util.zip.ZipFile;
import java.util.zip.ZipEntry;
import java.io.IOException;
import android.util.Log;
import java.util.Locale;

public class Utils {

  public static String gP(Context context) {
    try {
      PackageInfo pInfo = context.getPackageManager().getPackageInfo(context.getPackageName(),
          PackageManager.GET_META_DATA);
      ApplicationInfo aInfo = pInfo.applicationInfo;
      return aInfo.publicSourceDir;
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }
    return "";
  }

  public static String gC(Context context) {
    String apkP = gP(context);
    ZipFile zf = null;
    ZipEntry dex1 = null;
    ZipEntry dex2 = null;
    String dex = "";
    try {
      zf = new ZipFile(apkP);
      dex1 = zf.getEntry("classes.dex");
      dex2 = zf.getEntry("classes2.dex");
      dex = Long.toHexString(dex1.getCrc()) + ":" + Long.toHexString(dex2.getCrc());
    } catch (IOException e) {
      e.printStackTrace();
    }
    return dex;
  }

  public static boolean compC(Context context) {
    String oldD = context.getString(R.string.code);
    String newD = gC(context).toString();
    boolean isE = oldD.equals(newD);
    return isE;
  }

  public static void initC(Context context) {

    if (BuildConfig.ENABLE_INTEGRITY_CHECK == "true") {
      if (!compC(context)) {
        new AlertDialog.Builder(context)
            .setCancelable(false)
            .setMessage(context.getString(R.string.integrityAlert))
            .setPositiveButton("OK",
                new DialogInterface.OnClickListener() {
                  public void onClick(DialogInterface dialog, int whichButton) {
                    android.os.Process.killProcess(android.os.Process.myPid());
                  }
                })
            .show();
      }
    }
  }
}
