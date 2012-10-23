Ext.ns('biglifts.views.liftSchedule.assistance', 'biglifts.liftSchedule.assistance.custom');

biglifts.liftSchedule.assistance.custom.editCustomMovement = function (dataview, index) {
    var movement = biglifts.stores.assistance.CustomMovement.getAt(index);
    biglifts.liftSchedule.assistance.custom.showEditCustomMovement(movement);
};

biglifts.liftSchedule.assistance.custom.addCustomMovement = function () {
    biglifts.stores.assistance.CustomMovement.add({liftProperty:biglifts.liftSchedule.currentLiftProperty, name:"", sets:5, reps:15});
    biglifts.stores.assistance.CustomMovement.sync();
    biglifts.liftSchedule.assistance.custom.showEditCustomMovement(biglifts.stores.assistance.CustomMovement.last());
};

biglifts.liftSchedule.assistance.custom.filterCustomMovements = function () {
    biglifts.stores.assistance.CustomMovement.clearFilter();
    biglifts.stores.assistance.CustomMovement.filter('liftProperty', biglifts.liftSchedule.currentLiftProperty);
};

biglifts.liftSchedule.assistance.custom.logMovements = function () {
    biglifts.stores.assistance.CustomMovement.each(function (record) {
        var assistanceRecord = {
            movement:record.get('name'),
            assistanceType:'Custom',
            sets:record.get('sets'),
            reps:record.get('reps'),
            weight:record.get('weight'),
            timestamp:new Date().getTime()
        };

        biglifts.stores.assistance.ActivityLog.add(assistanceRecord);
        biglifts.stores.assistance.ActivityLog.sync();
    });

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
};

biglifts.views.liftSchedule.assistance.Custom = {
    xtype:'panel',
    id:'custom-assistance',
    layout:'fit',
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:'Custom',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:biglifts.liftSchedule.assistance.returnToAssistanceSelect
                },
                {
                    xtype:'spacer'
                },
                {
                    text:'Save',
                    ui:'confirm',
                    handler:biglifts.liftSchedule.assistance.custom.logMovements
                }
            ]
        },
        {
            xtype:'toolbar',
            docked:'bottom',
            cls:'custom-movement-toolbar',
            items:[
                {
                    text:'Add...',
                    ui:'confirm',
                    handler:biglifts.liftSchedule.assistance.custom.addCustomMovement
                }
            ]
        },
        {
            xtype:'list',
            store:biglifts.stores.assistance.CustomMovement,
            itemTpl:"<table class='assistance-table'><tbody><tr>" +
                "<td width='50%'><span class='name'>{name}</b></td><td width='20%'>{sets} sets</td><td style='text-align:right;' width='30%'>{reps}x " +
                "{[biglifts.logList.getWeightDisplay(values.weight)]}" +
                "{[biglifts.stores.Settings.first().get('units')]}</td>" +
                "</tr></tbody></table>",
            listeners:{
                initialize:function (list) {
                    list.addListener('itemtap', biglifts.liftSchedule.assistance.custom.editCustomMovement);
                }
            }
        }
    ],
    listeners:{
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.liftSchedule.assistance.returnToAssistanceSelect);
            biglifts.liftSchedule.assistance.custom.filterCustomMovements();
        }
    }
};