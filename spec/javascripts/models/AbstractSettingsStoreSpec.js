(function () {
    var MODULE_NAME = "Abstract Settings Stores";
    module(MODULE_NAME);

    var settingsStore;
    QUnit.moduleStart(function (details) {
        if( details.name === MODULE_NAME ){
            Ext.define('TestModel', {
                extend: "Ext.data.Model",
                config: {
                    identifier: 'uuid',
                    fields: [
                        {name: 'id', type: 'string'},
                        {name: 'units', type: 'string'}
                    ],
                    proxy: {
                        type: 'localstorage',
                        id: 'testmodel'
                    }
                }
            });

            Ext.define('SettingsTestStore', {
                extend: "biglifts.stores.AbstractSettingsStore",
                config: {
                    model: 'TestModel'
                }
            });

            settingsStore = Ext.create('SettingsTestStore');
        }
    });

    test("should determine if a model has a field", function () {
        ok(settingsStore.hasField('units'));
        equal(settingsStore.hasField('units2'), false);
    });
})();
