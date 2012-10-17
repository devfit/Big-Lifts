Ext.ns('biglifts.stores.assistance');

Ext.define('BoringButBigLift', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},

            {name:'lift_id', type:'string'},
            {name:'movement_lift_id', type:'string'},
            {name:'name', type:'string'},
            {name:'weight', type:'float'},
            {name:'reps', type:'int'},
            {name:'sets', type:'int'}
        ],
        proxy:{
            type:'localstorage',
            id:'boring-but-big-proxy'
        }
    }
});


Ext.define('BoringButBigStore', {
    extend:'Ext.data.Store',
    getWeightForRecord:function (data) {
        if (data.weight) {
            return data.weight;
        }

        var associatedLift = biglifts.stores.lifts.Lifts.findRecord('id', data.movement_lift_id);
        return biglifts.weight.format(biglifts.weight.lowerMaxToTrainingMax(associatedLift.get('max')),
            biglifts.stores.assistance.BoringButBigPercentage.first().get('percentage'));
    },
    getNameForRecord:function (data) {
        if (data.name) {
            return data.name;
        }

        var associatedLift = biglifts.stores.lifts.Lifts.findRecord('id', data.movement_lift_id);
        return associatedLift.get('name');
    },
    config:{
        model:'BoringButBigLift',
        listeners:{
            load:function () {
                if (this.getCount() === 0) {
                    util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
                        biglifts.stores.lifts.Lifts.each(function (r) {
                            biglifts.stores.assistance.BoringButBig.add({
                                name:null,
                                lift_id:r.get('id'),
                                movement_lift_id:r.get('id'),
                                weight:null,
                                reps:10,
                                sets:5
                            });
                        });
                        biglifts.stores.assistance.BoringButBig.sync();
                    });
                }
            }
        }
    }
});

biglifts.stores.assistance.BoringButBig = Ext.create('BoringButBigStore');
biglifts.stores.push(biglifts.stores.assistance.BoringButBig);