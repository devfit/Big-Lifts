Ext.ns('biglifts.stores.plates');

Ext.define('Plates', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'weight', type:'float'},
            {name:'weightInLbs', type:'float'},
            {name:'units', type:'string'},
            {name:'count', type:'integer'}
        ],
        proxy:{
            type:'localstorage',
            id:'plates-proxy'
        }
    }
});

biglifts.stores.plates.migrateWeightInLbsToWeightAndUnits = function (store) {
    store.each(function (record) {
        var weightInLbs = record.get('weightInLbs');
        if (!_.isUndefined(weightInLbs) && !_.isNull(weightInLbs)) {
            record.set('weight', weightInLbs);
            record.set('weightInLbs', null);
        }
    });
    store.sync();
};

Ext.define("PlateStore", {
    extend:'Ext.data.Store',
    getAllPlatePairs:function () {
        var platePairs = {};
        biglifts.stores.Plates.each(function (r) {
            var weight = r.get('weight');
            platePairs[weight] = parseInt(r.get('count') / 2);
        });

        return platePairs;
    },
    DEFAULT_PLATES_LBS:[
        {weight:45, count:6},
        {weight:35, count:6},
        {weight:25, count:6},
        {weight:10, count:6},
        {weight:5, count:6},
        {weight:2.5, count:6}
    ],
    DEFAULT_PLATES_KG:[
        {weight:25, count:6},
        {weight:20, count:6},
        {weight:10, count:6},
        {weight:5, count:6},
        {weight:2.5, count:6},
        {weight:1.25, count:6}
    ],
    config:{
        model:'Plates',
        listeners:{
            load:function (store) {
                if (store.getCount() === 0) {
                    store.add(biglifts.stores.Plates.DEFAULT_PLATES_LBS);
                    store.sync();
                }
                else {
                    biglifts.stores.plates.migrateWeightInLbsToWeightAndUnits(this);
                }
            }
        }
    }
});
biglifts.stores.Plates = Ext.create('PlateStore', {});
biglifts.stores.push(biglifts.stores.Plates);