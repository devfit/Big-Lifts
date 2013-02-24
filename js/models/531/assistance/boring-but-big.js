Ext.ns('biglifts.stores.assistance');

Ext.define('BoringButBigLift', {
    extend: 'Ext.data.Model',
    config: {
        identifier: 'uuid',
        fields: [
            {name: 'id', type: 'string'},

            {name: 'lift_id', type: 'string'},
            {name: 'movement_lift_id', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'weight', type: 'float'},
            {name: 'reps', type: 'int'},
            {name: 'sets', type: 'int'},
            {name: 'order', type: 'int'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'boring-but-big-proxy'
        }
    }
});

Ext.define('BoringButBigStore', {
    extend: 'Ext.data.Store',
    addWithOrder: function (recordConfig) {
        recordConfig.order = this.max('order') + 1;
        this.add(recordConfig);
    },
    getWeightForRecord: function (data) {
        if (data.weight) {
            return data.weight;
        }

        if (data.movement_lift_id) {
            var associatedLift = biglifts.stores.lifts.Lifts.findRecord('id', data.movement_lift_id);
            return biglifts.weight.format(biglifts.weight.lowerMaxToTrainingMax(associatedLift.get('max')),
                biglifts.stores.assistance.BoringButBigPercentage.first().get('percentage'));
        }

        return 0;
    },
    getNameForRecord: function (data) {
        if (data.name) {
            return data.name;
        }

        var associatedLift = biglifts.stores.lifts.Lifts.findRecord('id', data.movement_lift_id);
        return associatedLift.get('name');
    },
    syncAssistanceToLifts: function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.lifts.Lifts, function () {
            biglifts.stores.lifts.Lifts.each(function (r) {
                var assistanceRecordExists = biglifts.stores.assistance.BoringButBig.find('lift_id', r.get('id')) !== -1;
                if (!assistanceRecordExists) {
                    biglifts.stores.assistance.BoringButBig.add({
                        name: null,
                        lift_id: r.get('id'),
                        movement_lift_id: r.get('id'),
                        weight: null,
                        reps: 10,
                        sets: 5,
                        order: 0
                    });
                }
            });
            biglifts.stores.assistance.BoringButBig.sync();
            biglifts.stores.lifts.Lifts.addListener('beforesync', Ext.bind(me.syncAssistanceToLifts, me));
        });
    },
    config: {
        model: 'BoringButBigLift',
        storeId: 'bbb',
        listeners: {
            load: function () {
                this.syncAssistanceToLifts();
            }
        },
        sorters: [
            {
                property: 'order',
                direction: 'ASC'
            }
        ]
    }
});

biglifts.stores.assistance.BoringButBig = Ext.create('BoringButBigStore');
biglifts.stores.push(biglifts.stores.assistance.BoringButBig);