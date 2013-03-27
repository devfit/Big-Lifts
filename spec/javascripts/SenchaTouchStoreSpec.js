(function () {
    var MODULE_NAME = "Sencha Touch Model Bugs";
    module(MODULE_NAME);
    var store;

    QUnit.moduleStart(function (details) {
        if (details.name === MODULE_NAME) {
            Ext.define('ModelWithFloats', {
                extend: 'Ext.data.Model',
                config: {
                    identifier: 'uuid',
                    fields: [
                        {name: 'id', type: 'string'},
                        {name: 'weight', type: 'float'}
                    ],
                    proxy: {
                        type: 'localstorage',
                        id: 'model-with-floats-proxy'
                    }
                }
            });

            store = Ext.create('Ext.data.Store', {
                model: 'ModelWithFloats'
            });

            store.add({weight: 25});
            store.add({weight: 2.5});
            store.sync();
        }
    });

    test("should be able to find existing records", function () {
        notEqual(store.findRecord('weight', 25), null);
        notEqual(store.findRecord('weight', 2.5), null);
    });

    test("should not find non existing records with decimals", function () {
        var record = store.findRecord('weight', 2.1);
        strictEqual(record, null);
    });

//    test("should not find non existing records without decimals", function(){
//        var record = store.findRecord('weight', 2);
//        expect(record === null).toBe(true);
//    });
})();