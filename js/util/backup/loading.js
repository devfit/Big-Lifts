Ext.ns('wendler.loading', 'wendler.main');
wendler.loading.loadStore = function (store, callback) {
    if (wendler.loadingFromFile) {
        util.filebackup.loadStore(store, function(){
            util.filebackup.watchStoreSync(store);
            callback();
        });
    }
    else {
        store.load(function(){
            util.filebackup.watchStoreSync(store);
            callback();
        });
    }
};

wendler.loading.loadTasks = _.map(wendler.stores, function(store){
   return function(callback){
       wendler.loading.loadStore(store,callback);
   }
});
wendler.loading.loaded = false;
async.series(wendler.loading.loadTasks, function(){
    wendler.loading.loaded = true;
    if( wendler.main.start ){
        wendler.main.start();
    }
});

