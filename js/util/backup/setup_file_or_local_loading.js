Ext.ns('wendler');
wendler.isBrokenTouchWiz = typeof(PhoneGap) !== 'undefined' && _.isUndefined(window.requestFileSystem);

wendler.loadingFromFile = false;
if (localStorage.length === 0) {
    wendler.loadingFromFile = true;
    if (!wendler.isBrokenTouchWiz) {
        wendler.loadingFromFile = false;
    }
}