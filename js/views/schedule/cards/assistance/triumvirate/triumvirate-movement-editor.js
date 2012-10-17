Ext.ns('biglifts.views.liftSchedule.assistance', 'biglifts.liftSchedule.assistance.triumvirate');

biglifts.liftSchedule.assistance.triumvirate.showEditTriumvirateMovement = function (movement) {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('triumvirate-movement-editor'));
    Ext.getCmp('triumvirate-movement-editor').setRecord(movement);
};

biglifts.liftSchedule.assistance.triumvirate.returnToTriumvirate = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('triumvirate'));
};

biglifts.liftSchedule.assistance.triumvirate.saveMovementChange = function () {
    var movementEditor = Ext.getCmp('triumvirate-movement-editor');
    var newValues = movementEditor.getValues();
    var record = movementEditor.getRecord();
    var newData = Ext.merge(record.data, newValues);

    record.set(newData);
    record.save();
};

biglifts.views.liftSchedule.assistance.TriumvirateMovementEditor = {
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
                    handler:biglifts.liftSchedule.assistance.triumvirate.returnToTriumvirate
                }
            ]
        },
        {
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            defaults:{
                listeners:{
                    change:biglifts.liftSchedule.assistance.triumvirate.saveMovementChange
                }
            },
            items:[
                {
                    xtype:'textfield',
                    label:'Name',
                    name:'name'
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
                    xtype: 'numberfield',
                    label:'Weight',
                    name:'weight'
                }
            ]
        }
    ],
    listeners:{
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.liftSchedule.assistance.triumvirate.returnToTriumvirate);
        }
    }
};