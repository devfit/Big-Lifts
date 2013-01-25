var reloadStore = function (store) {
    store.clearFilter();
    store.removeAll();
    store.sync();
    store.load();

    return store;
};

var emptyStore = function (store) {
    store.clearFilter();
    store.removeAll();
    store.sync();
    return store;
};

var ensureLoaded = function (store) {
    if (!store.isLoaded()) {
        store.load();
    }
    return store;
};