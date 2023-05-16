package com.meinvodafone.rn.dev;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

import android.annotation.SuppressLint;
import android.content.Context;
import com.chuckerteam.chucker.api.ChuckerCollector;
import com.chuckerteam.chucker.api.ChuckerInterceptor;
import com.chuckerteam.chucker.api.RetentionManager;
import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.ReactCookieJarContainer;

import java.lang.reflect.Field;

import okhttp3.OkHttpClient;
import okhttp3.CertificatePinner;

public class MVFClientFactory implements OkHttpClientFactory {
  private Context _context;
  private CertificatePinner certificatePinner;

  public MVFClientFactory(Context context) {
    _context = context;
  }

  @Override
  public OkHttpClient createNewNetworkModuleClient() {
    try {
      // chucker interceptor
      ChuckerCollector chuckerCollector = new ChuckerCollector(_context, true, RetentionManager.Period.ONE_HOUR);
      ChuckerInterceptor chuckerInterceptor = new ChuckerInterceptor.Builder(_context).collector(chuckerCollector)
          .maxContentLength(250_000L)
          .alwaysReadResponseBody(true)
          .build();

      OkHttpClient client = new OkHttpClient.Builder()
          .cookieJar(new ReactCookieJarContainer())
          .addNetworkInterceptor(chuckerInterceptor)
          .build();

      if (BuildConfig.ENABLE_CERT_PINNING == "true") {
        // certificate pinning
        String[] pins = this._context.getResources().getStringArray(R.array.pins);
        certificatePinner = new CertificatePinner.Builder()
            .add("www.vodafone.de", pins[0])
            .add("www.vodafone.de", pins[1])
            .add("api.vodafone.de", pins[2])
            .add("api.vodafone.de", pins[3])
            .build();

        client = client
            .newBuilder()
            .certificatePinner(certificatePinner)
            .build();
      }

      return client;
    } catch (Exception e) {
      return new OkHttpClient.Builder().build();
    }
  }
}
