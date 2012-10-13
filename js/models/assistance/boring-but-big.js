Ext.ns('wendler.stores.assistance');

Ext.define('BoringButBigLift', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'lift_id', type:'string'},
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

        var associatedLift = wendler.stores.lifts.Lifts.findRecord('id', data.lift_id);
        return wendler.weight.lowerMaxToTrainingMax(associatedLift.get('max')) *
            wendler.stores.assistance.BoringButBigPercentage.first().get('percentage') / 100.0;
    },
    config:{
        model:'BoringButBigLift',
        listeners:{
            load:function () {
                if (this.getCount() === 0) {
                    util.withLoadedStore(wendler.stores.lifts.Lifts, function () {
                        wendler.stores.lifts.Lifts.each(function (r) {
                            var bbbRecord = {
                                name:r.get("name"),
                                lift_id:r.get("id"),
                                weight:null,
                                reps:10,
                                sets:5
                            };
                            wendler.stores.assistance.BoringButBig.add(bbbRecord);
                        });
                        wendler.stores.assistance.BoringButBig.sync();
                    });
                }
            }
        }
    }
});

wendler.stores.assistance.BoringButBig = Ext.create('BoringButBigStore');