Ext.ns('wendler.views.liftSchedule.assistance', 'wendler.liftSchedule.assistance.triumvirate');

wendler.liftSchedule.assistance.triumvirate.showEditTriumvirateMovement = function (movement) {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('triumvirate-movement-editor'));
    Ext.getCmp('triumvirate-movement-editor').setRecord(movement);
};

wendler.liftSchedule.assistance.triumvirate.returnToTriumvirate = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('triumvirate'));
};

wendler.liftSchedule.assistance.triumvirate.saveMovementChange = function () {
    var movementEditor = Ext.getCmp('triumvirate-movement-editor');
    var newValues = movementEditor.getValues();
    var record = movementEditor.getRecord();
    var newData = Ext.merge(record.data, newValues);

    record.set(newData);
    record.save();
};

wendler.views.liftSchedule.assistance.TriumvirateMovementEditor = {
    xtype:'formpanel',
    id:'triumvirate-movement-editor',
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
                    handler:wendler.liftSchedule.assistance.triumvirate.returnToTriumvirate
                }
            ]
        },
        {
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            defaults:{
                listeners:{
                    change:wendler.liftSchedule.assistance.triumvirate.saveMovementChange
                }
            },
            items:[
                {
                    xtype:'textfield',
                    label:'Name',
                    name:'name',
                    value:''
                },
                {
                    xtype:'numberfield',
                    label:'Sets',
                    name:'sets',
                    value:''
                },
                {
                    xtype:'numberfield',
                    label:'Reps',
                    name:'reps',
                    value:''
                }
            ]
        }
    ],
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.assistance.triumvirate.returnToTriumvirate);
        }
    }
};