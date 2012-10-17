Ext.ns('biglifts.views.liftSchedule.assistance', 'biglifts.liftSchedule.assistance.boringButBig');

biglifts.liftSchedule.assistance.boringButBig.movementBeingEdited = null;

biglifts.liftSchedule.assistance.boringButBig.showEditBbbMovement = function (movement) {
    biglifts.liftSchedule.assistance.boringButBig.movementBeingEdited = movement;

    var formRecord = _.clone(movement.data);
    if (formRecord.lift_id) {
        var lift = biglifts.stores.lifts.Lifts.findRecord('id', formRecord.movement_lift_id);
        formRecord.lift = lift.get('propertyName');
    }

    Ext.getCmp('bbb-movement-editor').setValues(formRecord);
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('bbb-movement-editor'));
};

biglifts.liftSchedule.assistance.boringButBig.returnToBbb = function () {
    biglifts.liftSchedule.assistance.boringButBig.saveMovementChange();
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big'));
};

biglifts.liftSchedule.assistance.boringButBig.saveMovementChange = function () {
    var movementEditor = Ext.getCmp('bbb-movement-editor');
    var newValues = movementEditor.getValues();

    var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', newValues.lift);
    var newRecordData = {
        sets:newValues.sets,
        reps:newValues.reps,
        movement_lift_id:lift.get('id')
    };

    var record = biglifts.liftSchedule.assistance.boringButBig.movementBeingEdited;
    record.set(Ext.merge(_.clone(record.data), newRecordData));
    record.save();
};

biglifts.views.liftSchedule.assistance.BoringButBigMovementEditor = {
    xtype:'formpanel',
    id:'bbb-movement-editor',
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:'Edit',
            items:[
                {
                    xtype:'button',
                    ui:'back',
                    text:'Back',
                    handler:biglifts.liftSchedule.assistance.boringButBig.returnToBbb
                }
            ]
        },
        {
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            items:[
                {
                    name:'lift',
                    xtype:'selectfield',
                    valueField:'propertyName',
                    displayField:'name',
                    label:'Lift',
                    store:biglifts.stores.lifts.Lifts
                },
                {
                    xtype:'textfield',
                    label:'Name',
                    name:'name',
                    hidden:true
                },
                {
                    xtype:'numberfield',
                    label:'Sets',
                    name:'sets'
                },
                {
                    xtype:'numberfield',
                    label:'Reps',
                    name:'reps'
                },
                {
                    xtype:'numberfield',
                    label:'Weight',
                    name:'weight',
                    hidden:true
                }
            ]
        }
    ],
    listeners:{
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.liftSchedule.assistance.boringButBig.returnToBbb);
        }
    }
};