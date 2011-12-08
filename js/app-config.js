var appConfig = {};
if (Ext.is.Android) {
    appConfig.cardSwitchAnimation = false;
}
else {
    appConfig.cardSwitchAnimation = 'slide';
}

Ext.ns('wendler.events');
wendler.events.appLoadCallbackFunctions = [];