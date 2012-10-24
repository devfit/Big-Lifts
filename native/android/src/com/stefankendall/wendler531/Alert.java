package com.stefankendall.wendler531;

import android.content.Context;
import android.media.AudioManager;
import android.media.SoundPool;

public class Alert {
    private SoundPool soundPool;
    private int alertId;

    public Alert(Context context) {
        soundPool = new SoundPool(1, AudioManager.STREAM_ALARM, 100);
        alertId = soundPool.load(context, R.raw.alert, 1);
    }

    public void playAlert() {
        soundPool.play(alertId, 1f, 1f, 1, 0, 1f);
    }
}
