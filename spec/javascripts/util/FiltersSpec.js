module("Filter utility");
test("should be able to temporarily remove filters", function () {
    Ext.define('TestModel', {
        extend: 'Ext.data.Model',
        config: {
            identifier: 'uuid',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'value', type: 'integer'}
            ],
            proxy: {
                type: 'memory',
                id: 'testproxy'
            }
        }
    });
    var store = Ext.create("Ext.data.Store", {model: 'TestModel'});
    store.add({value: 1});
    store.add({value: 2});
    store.sync();
    equal(store.getCount(), 2);
    store.filter('value', 1);
    equal(store.getCount(), 1);
    util.withNoFilters(store, function (s) {
        equal(s.getCount(), 2);
    });
});