package com.stefankendall.wendler531;

import android.os.Bundle;
import android.view.WindowManager;
import org.apache.cordova.DroidGap;

public class App extends DroidGap {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();

        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.setIntegerProperty("loadUrlTimeoutValue", 70000);
        appView.addJavascriptInterface(new ScreenLockingInterface(this), "ScreenLock");
        super.loadUrl("file:///android_asset/www/index.html");
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
}

