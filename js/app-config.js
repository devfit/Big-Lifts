var appConfig = {};
if (Ext.is.Android) {
    appConfig.cardSwitchAnimation = false;
}
else {
    appConfig.cardSwitchAnimation = 'slide';
}