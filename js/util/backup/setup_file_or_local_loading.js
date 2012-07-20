Ext.ns('wendler');
if (localStorage.length === 0) {
    var isBrokenTouchWiz = _.isDefined(PhoneGap) && _.isUndefined(window.requestFileSystem);
    wendler.loadingFromFile = true;
    if( !isBrokenTouchWiz ){
        wendler.loadingFromFile = false;
    }
}