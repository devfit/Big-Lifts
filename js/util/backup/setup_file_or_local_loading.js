Ext.ns('wendler');
wendler.isBrokenTouchWiz = _.isDefined(PhoneGap) && _.isUndefined(window.requestFileSystem);
if (localStorage.length === 0) {
    wendler.loadingFromFile = true;
    if( !wendler.isBrokenTouchWiz ){
        wendler.loadingFromFile = false;
    }
}