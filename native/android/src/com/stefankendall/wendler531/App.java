package com.stefankendall.wendler531;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;

import java.lang.Readable;

public class App extends DroidGap {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.setIntegerProperty("loadUrlTimeoutValue", 70000);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}

