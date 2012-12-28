var reloadStore = function(store){
    store.clearFilter();
    store.removeAll();
    store.sync();
    store.load();
};