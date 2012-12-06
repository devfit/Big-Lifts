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
    migrateWeightInLbsToWeightAndUnits:function () {
        this.each(function (record) {
            var weightInLbs = record.get('weightInLbs');
            if (!_.isUndefined(weightInLbs) && !_.isNull(weightInLbs)) {
                record.set('weight', weightInLbs);
                record.set('weightInLbs', null);
            }
        });
        this.sync();
    },
    platesAreDefault:function (comparisonPlates) {
        var actualPlateWeights = [];
        this.each(function (p) {
            actualPlateWeights.push({weight:p.get('weight'), count:p.get('count')});
        });

        return _.isEqual(actualPlateWeights, comparisonPlates);
    },
    adjustPlatesForUnits:function () {
        var units = biglifts.stores.w.Settings.first().get('units');
        if (units == 'kg' && this.platesAreDefault(this.DEFAULT_PLATES_LBS)) {
            this.removeAll();
            this.add(this.DEFAULT_PLATES_KG);
        }
        else if (units == 'lbs' && this.platesAreDefault(this.DEFAULT_PLATES_KG)) {
            this.removeAll();
            this.add(this.DEFAULT_PLATES_LBS);
        }

        this.sync();
    },
    config:{
        model:'Plates',
        listeners:{
            load:function (store) {
                biglifts.stores.w.Settings.addListener('beforesync', Ext.bind(this.adjustPlatesForUnits, this));

                if (store.getCount() === 0) {
                    store.add(this.DEFAULT_PLATES_LBS);
                    store.sync();
                }
                else {
                    this.migrateWeightInLbsToWeightAndUnits();
                }
            }
        }
    }
});

biglifts.stores.Plates = Ext.create('PlateStore', {});
biglifts.stores.push(biglifts.stores.Plates);
