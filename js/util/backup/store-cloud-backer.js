Ext.ns('util.cloudbackup');

util.cloudbackup.watchedStores = [];
util.cloudbackup.watchStoreSync = function (store) {
    util.cloudbackup.watchedStores.push(store);
    store.addListener('beforesync', util.cloudbackup.storeHasChanged);
    store.addListener('remove', util.cloudbackup.storeHasChanged);
};

util.cloudbackup.retrieveCloudData = function () {
    _.each(util.cloudbackup.watchedStores, function (store) {
        var className = util.proxy.getProxyNameFromStore(store);
        parse.getRecordsForUser(util.cloudbackup.getUserId(), className, util.cloudbackup.cloudDataRetrieved);
    });
};

util.cloudbackup.storeHasChanged = function (store) {

};

util.cloudbackup.cloudDataRetrieved = function () {

};

util.cloudbackup.getUserId = function(){
    if( !_.isUndefined(device) ){
        return device.uuid;
    }
};