Ext.ns('wendler.views.liftSchedule.assistance', 'wendler.liftSchedule.assistance.boringButBig');

wendler.liftSchedule.assistance.boringButBig.movementBeingEdited = null;

wendler.liftSchedule.assistance.boringButBig.showEditBbbMovement = function (movement) {
    wendler.liftSchedule.assistance.boringButBig.movementBeingEdited = movement;

    var formRecord = _.clone(movement.data);
    if (formRecord.lift_id) {
        var lift = wendler.stores.lifts.Lifts.findRecord('id', formRecord.movement_lift_id);
        formRecord.lift = lift.get('propertyName');
    }

    Ext.getCmp('bbb-movement-editor').setValues(formRecord);
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('bbb-movement-editor'));
};

wendler.liftSchedule.assistance.boringButBig.returnToBbb = function () {
    wendler.liftSchedule.assistance.boringButBig.saveMovementChange();
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big'));
};

wendler.liftSchedule.assistance.boringButBig.saveMovementChange = function () {
    var movementEditor = Ext.getCmp('bbb-movement-editor');
    var newValues = movementEditor.getValues();

    var lift = wendler.stores.lifts.Lifts.findRecord('propertyName', newValues.lift);
    var newRecordData = {
        sets:newValues.sets,
        reps:newValues.reps,
        movement_lift_id:lift.get('id')
    };

    var record = wendler.liftSchedule.assistance.boringButBig.movementBeingEdited;
    record.set(Ext.merge(_.clone(record.data), newRecordData));
    record.save();
};

wendler.views.liftSchedule.assistance.BoringButBigMovementEditor = {
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
                    handler:wendler.liftSchedule.assistance.boringButBig.returnToBbb
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
                    store:wendler.stores.lifts.Lifts
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
            wendler.navigation.setBackFunction(wendler.liftSchedule.assistance.boringButBig.returnToBbb);
        }
    }
};