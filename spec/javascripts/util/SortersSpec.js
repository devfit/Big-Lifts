module("Sorters utility");
test("should be able to temporarily remove sorters", function () {
    Ext.define('TestModel2', {
        extend: 'Ext.data.Model',
        config: {
            identifier: 'uuid',
            fields: [
                {name: 'id', type: 'string'},
                {name: 'value1', type: 'integer'},
                {name: 'value2', type: 'integer'}
            ],
            proxy: {
                type: 'memory',
                id: 'testproxy2'
            }
        }
    });
    var store = Ext.create("Ext.data.Store", {model: 'TestModel2'});

    store.add({value1: 1, value2: 2});
    store.add({value1: 2, value2: 1});
    store.sync();

    store.sort('value1', 'ASC');
    store.data.addSorter(new Ext.util.Sorter({
        property: 'value2',
        direction: 'DESC'
    }));

    equal(store.data._sorters.getCount(), 2);
    util.withNoSorters(store, function (s) {
        equal(s.data._sorters.getCount(), 0);
    });
    equal(store.data._sorters.getCount(), 2);
});