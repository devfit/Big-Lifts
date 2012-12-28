var reloadStore = function(store){
    store.removeAll();
    store.sync();
    store.load();
};