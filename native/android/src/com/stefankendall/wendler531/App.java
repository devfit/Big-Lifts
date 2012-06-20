package com.stefankendall.wendler531;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;

import java.lang.Readable;

public class App extends DroidGap {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("loadUrlTimeoutValue", 70000);
        super.setIntegerProperty("splashscreen", R.drawable.splash);

        int TEN_SECONDS = 10000;
        super.loadUrl("file:///android_asset/www/index.html", TEN_SECONDS);
    }
}

