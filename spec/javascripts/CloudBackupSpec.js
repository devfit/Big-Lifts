describe("CloudBackup", function () {
    var store;

    beforeEach(function () {
        Ext.define('TestModel', {
            extend:'Ext.data.Model',
            config:{
                fields:[
                    {name:'id', type:'integer'}
                ],
                proxy:{
                    type:'localstorage',
                    id:'meta-proxy'
                }
            }
        });

        store = Ext.create('Ext.data.Store', {
            autoLoad:true,
            model:'TestModel'
        });
        store.add({id:1});
        store.add({id:2});
        store.add({id:3});
        store.sync();
    });

    it("should identify new record ids", function () {
        var newRecordIds = util.cloudbackup.getNewRecordIds([
            {id:1},
            {id:2}
        ], store);
        expect(newRecordIds).toEqual([3]);
    });

    it("should identify existing record ids", function () {
        var newRecordIds = util.cloudbackup.getExistingRecordIds([
            {id:1},
            {id:2}
        ], store);
        expect(newRecordIds).toEqual([1, 2]);
    });

    it("should identify deleted record ids", function(){
        var deletedRecordIds = util.cloudbackup.findDeletedRecords([
            {id:1},
            {id:2},
            {id:3},
            {id:4}
        ], store);
        expect(deletedRecordIds).toEqual([4]);
    });

    it("should get store field names", function () {
        Ext.define('TestModel', {
            extend:'Ext.data.Model',
            config:{
                fields:[
                    {name:'id', type:'integer'},
                    {name:'test', type:'boolean'},
                    {name:'test2', type:'string'}
                ],
                proxy:{
                    type:'localstorage',
                    id:'meta-proxy'
                }
            }
        });

        var store = Ext.create('Ext.data.Store', {
            model:'TestModel'
        });

        expect(util.cloudbackup.getFieldsFromStore(store)).toEqual(['id', 'test', 'test2']);
    });

    it("should find changed records", function () {
        Ext.define('TestModel2', {
            extend:'Ext.data.Model',
            config:{
                fields:[
                    {name:'id', type:'integer'},
                    {name:'name', type:'string'}
                ],
                proxy:{
                    type:'localstorage',
                    id:'changed-records-proxy'
                }
            }
        });

        store = Ext.create('Ext.data.Store', {
            autoLoad:true,
            model:'TestModel2'
        });
        store.add({id:1, name:"A"});
        store.add({id:2, name:"B"});
        store.add({id:3, name:"C"});
        store.sync();

        var oneChange = [
            {id:1, name:"Q"},
            {id:2, name:"B"}
        ];

        var noChanges = [
            {id:1, name:'A'},
            {id:2, name:'B'}
        ];

        expect(util.cloudbackup.findChangedRecords(oneChange, store, [1, 2])).toEqual([1]);
        expect(util.cloudbackup.findChangedRecords(noChanges, store, [1, 2])).toEqual([]);
    });

    it('should compare record equality', function(){
        expect(util.cloudbackup.isEqual(['a','b'], {a:1,b:2}, {a:1,b:2,c:3})).toBeTruthy();
        expect(util.cloudbackup.isEqual(['a','b'], {a:1,b:2}, {a:11,b:22,c:3})).toBeFalsy();
        expect(util.cloudbackup.isEqual([], {a:3}, {a:5})).toBeTruthy();
    });
});