package com.stefankendall.wendler531;

import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import org.apache.cordova.DroidGap;

public class NotificationSoundInterface {
    private DroidGap droidGap;

    public NotificationSoundInterface(DroidGap droidGap) {
        this.droidGap = droidGap;
    }

    public void playAlert() {
        Uri alert = getAlertUri();
        Ringtone r = RingtoneManager.getRingtone(droidGap.getApplicationContext(), alert);
        r.play();
    }

    private Uri getAlertUri() {
        Uri alert = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM);
        if (alert == null) {
            alert = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            if (alert == null) {
                alert = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
            }
        }
        return alert;
    }
}
