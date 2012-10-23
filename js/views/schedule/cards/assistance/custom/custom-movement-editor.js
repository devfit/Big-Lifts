Ext.ns('biglifts.views.liftSchedule.assistance', 'biglifts.liftSchedule.assistance.custom');

biglifts.liftSchedule.assistance.custom.showEditCustomMovement = function (movement) {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('custom-movement-editor'));
    Ext.getCmp('custom-movement-editor').setRecord(movement);
};

biglifts.liftSchedule.assistance.custom.returnToCustom = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('custom-assistance'));
};

biglifts.liftSchedule.assistance.custom.saveMovementChange = function () {
    var movementEditor = Ext.getCmp('custom-movement-editor');
    var newValues = movementEditor.getValues();
    var record = movementEditor.getRecord();
    var newData = Ext.merge(record.data, newValues);

    record.set(newData);
    record.save();
};

biglifts.liftSchedule.assistance.custom.deleteMovement = function () {
    var movementEditor = Ext.getCmp('custom-movement-editor');
    var record = movementEditor.getRecord();
    biglifts.stores.assistance.CustomMovement.remove(record);
    biglifts.stores.assistance.CustomMovement.sync();

    biglifts.liftSchedule.assistance.custom.returnToCustom();
};

biglifts.views.liftSchedule.assistance.CustomMovementEditor = {
    xtype:'formpanel',
    id:'custom-movement-editor',
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
                    handler:biglifts.liftSchedule.assistance.custom.returnToCustom
                },
                {xtype:'spacer'},
                {
                    ui:'decline',
                    iconMask:true,
                    iconCls:'trash',
                    handler:biglifts.liftSchedule.assistance.custom.deleteMovement
                }
            ]
        },
        {
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            defaults:{
                listeners:{
                    change:biglifts.liftSchedule.assistance.custom.saveMovementChange
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
                    xtype:'numberfield',
                    label:'Weight',
                    name:'weight'
                }
            ]
        }
    ],
    listeners:{
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.liftSchedule.assistance.custom.returnToCustom);
        }
    }
};