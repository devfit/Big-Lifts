var reloadStore = function(store){
    store.clearFilter();
    store.removeAll();
    store.sync();
    store.load();

    return store;
};

var emptyStore = function(store){
    store.clearFilter();
    store.removeAll();
    store.sync();
    return store;
};