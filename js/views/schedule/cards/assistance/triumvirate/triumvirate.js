Ext.ns('wendler.views.liftSchedule.assistance', 'wendler.liftSchedule.assistance.triumvirate');

wendler.liftSchedule.assistance.triumvirate.editTriumvirateMovement = function (dataview, index) {
    var movement = wendler.stores.assistance.TriumvirateMovement.getAt(index);
    wendler.liftSchedule.assistance.triumvirate.showEditTriumvirateMovement(movement);
};

wendler.liftSchedule.assistance.triumvirate.filterTriumvirateMovements = function () {
    wendler.stores.assistance.TriumvirateMovement.clearFilter();
    wendler.stores.assistance.TriumvirateMovement.filter('liftProperty', wendler.liftSchedule.currentLiftProperty);
};

wendler.liftSchedule.assistance.triumvirate.logMovements = function () {
    wendler.stores.assistance.TriumvirateMovement.each(function (record) {
        var assistanceRecord = {
            movement:record.get('name'),
            assistanceType:'Triumvirate',
            sets:record.get('sets'),
            reps:record.get('reps'),
            weight:record.get('weight'),
            timestamp:new Date().getTime()
        };

        wendler.stores.assistance.ActivityLog.add(assistanceRecord);
        wendler.stores.assistance.ActivityLog.sync();
    });

    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
};

wendler.liftSchedule.assistance.triumvirate.getUnits = function () {
    return wendler.stores.Settings.first().get('units');
};

wendler.views.liftSchedule.assistance.Triumvirate = {
    xtype:'panel',
    id:'triumvirate',
    layout:'vbox',
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:'Triumvirate',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.liftSchedule.assistance.returnToAssistanceSelect
                },
                {
                    xtype:'spacer'
                },
                {
                    text:'Save',
                    ui:'confirm',
                    handler:wendler.liftSchedule.assistance.triumvirate.logMovements
                }
            ]
        },
        {
            flex:2,
            xtype:'list',
            store:wendler.stores.assistance.TriumvirateMovement,
            itemTpl:"<table class='triumvirate-table'><tbody><tr>" +
                "<td width='50%'><span class='name'>{name}</b></td><td width='20%'>{sets} sets</td><td style='text-align:right;' width='30%'>{reps}x " +
                "{[wendler.logList.getWeightDisplay(values.weight)]}" +
                "{[wendler.liftSchedule.assistance.triumvirate.getUnits()]}</td>" +
                "</tr></tbody></table>",
            listeners:{
                initialize:function (list) {
                    list.addListener('itemtap', wendler.liftSchedule.assistance.triumvirate.editTriumvirateMovement);
                }
            }
        },
        {
            flex:1,
            cls:'tap-to-edit',
            html:'Tap row to edit'
        }
    ],
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.assistance.returnToAssistanceSelect);
            wendler.liftSchedule.assistance.triumvirate.filterTriumvirateMovements();
        }
    }
};