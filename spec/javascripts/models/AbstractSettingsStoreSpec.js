describe("Abstract Settings Stores", function () {
    beforeEach(function () {
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

        this.settingsStore = Ext.create('SettingsTestStore');
    });

    it("should determine if a model has a field", function () {
        expect(this.settingsStore.hasField('units')).toBe(true);
        expect(this.settingsStore.hasField('units2')).toBe(false);
    });
});