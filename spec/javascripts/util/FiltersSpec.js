describe("Filter utility", function () {
    it("should be able to temporarily remove filters", function () {
        Ext.define('TestModel', {
            extend:'Ext.data.Model',
            config:{
                identifier:'uuid',
                fields:[
                    {name:'id', type:'string'},
                    {name:'value', type:'integer'}
                ],
                proxy:{
                    type:'memory',
                    id:'testproxy'
                }
            }
        });
        var store = Ext.create("Ext.data.Store", {model:'TestModel'});
        store.add({value:1});
        store.add({value:2});
        store.sync();
        expect(store.getCount()).toEqual(2);
        store.filter('value', 1);
        expect(store.getCount()).toEqual(1);
        util.withNoFilters(store, function (s) {
            expect(s.getCount()).toEqual(2);
        });
    });
});