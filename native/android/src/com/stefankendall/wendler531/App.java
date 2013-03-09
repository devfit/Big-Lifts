package com.stefankendall.wendler531;

import android.media.AudioManager;
import android.os.Bundle;
import android.view.WindowManager;
import android.widget.LinearLayout;
import com.google.ads.AdRequest;
import com.google.ads.AdSize;
import com.google.ads.AdView;
import org.apache.cordova.DroidGap;

public class App extends DroidGap {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();

        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.setIntegerProperty("loadUrlTimeoutValue", 70000);
        appView.addJavascriptInterface(new ScreenLockingInterface(this), "ScreenLock");
        appView.addJavascriptInterface(new AudioInfo(this), "AudioInfo");
        appView.addJavascriptInterface(new Alert(this.getContext()), "Alert");
        appView.addJavascriptInterface(new DateFormatFinder(this.getContext()), "DateFormatFinder");

        super.setVolumeControlStream(AudioManager.STREAM_MUSIC);
        super.loadUrl("file:///android_asset/www/index.html");
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        setupAds();
    }

    private void setupAds() {
        AdView adView = new AdView(this, AdSize.BANNER, "a15138083566f58");
        LinearLayout layout = super.root;
        layout.addView(adView);

        AdRequest request = new AdRequest();
        request.setTesting(true);
        adView.loadAd(request);

        super.root.requestLayout();
    }
}

