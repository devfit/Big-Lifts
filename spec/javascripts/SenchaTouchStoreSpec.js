describe("Sencha Touch Model Bugs", function () {
    var store;
    beforeEach(function () {
        Ext.define('ModelWithFloats', {
            extend:'Ext.data.Model',
            config:{
                identifier:'uuid',
                fields:[
                    {name:'id', type:'string'},
                    {name:'weight', type:'float'}
                ],
                proxy:{
                    type:'localstorage',
                    id:'model-with-floats-proxy'
                }
            }
        });

        store = Ext.create('Ext.data.Store', {
            model:'ModelWithFloats'
        });

        store.add({weight:25});
        store.add({weight:2.5});
        store.sync();
    });

    it("should be able to find existing records", function () {
        expect(store.findRecord('weight', 25)).not.toBe(null);
        expect(store.findRecord('weight', 2.5)).not.toBe(null);
    });

    it("should not find non existing records with decimals", function () {
        var record = store.findRecord('weight', 2.1);
        expect(record === null).toBe(true);
    });

    it("should not find non existing records without decimals", function(){
        var record = store.findRecord('weight', 2);
        expect(record === null).toBe(true);
    });
});