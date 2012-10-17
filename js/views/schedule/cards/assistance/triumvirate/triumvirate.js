Ext.ns('biglifts.views.liftSchedule.assistance', 'biglifts.liftSchedule.assistance.triumvirate');

biglifts.liftSchedule.assistance.triumvirate.editTriumvirateMovement = function (dataview, index) {
    var movement = biglifts.stores.assistance.TriumvirateMovement.getAt(index);
    biglifts.liftSchedule.assistance.triumvirate.showEditTriumvirateMovement(movement);
};

biglifts.liftSchedule.assistance.triumvirate.filterTriumvirateMovements = function () {
    biglifts.stores.assistance.TriumvirateMovement.clearFilter();
    biglifts.stores.assistance.TriumvirateMovement.filter('liftProperty', biglifts.liftSchedule.currentLiftProperty);
};

biglifts.liftSchedule.assistance.triumvirate.logMovements = function () {
    biglifts.stores.assistance.TriumvirateMovement.each(function (record) {
        var assistanceRecord = {
            movement:record.get('name'),
            assistanceType:'Triumvirate',
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

biglifts.views.liftSchedule.assistance.Triumvirate = {
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
                    handler:biglifts.liftSchedule.assistance.returnToAssistanceSelect
                },
                {
                    xtype:'spacer'
                },
                {
                    text:'Save',
                    ui:'confirm',
                    handler:biglifts.liftSchedule.assistance.triumvirate.logMovements
                }
            ]
        },
        {
            flex:2,
            xtype:'list',
            store:biglifts.stores.assistance.TriumvirateMovement,
            itemTpl:"<table class='assistance-table'><tbody><tr>" +
                "<td width='50%'><span class='name'>{name}</b></td><td width='20%'>{sets} sets</td><td style='text-align:right;' width='30%'>{reps}x " +
                "{[biglifts.logList.getWeightDisplay(values.weight)]}" +
                "{[biglifts.stores.Settings.first().get('units')]}</td>" +
                "</tr></tbody></table>",
            listeners:{
                initialize:function (list) {
                    list.addListener('itemtap', biglifts.liftSchedule.assistance.triumvirate.editTriumvirateMovement);
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
            biglifts.navigation.setBackFunction(biglifts.liftSchedule.assistance.returnToAssistanceSelect);
            biglifts.liftSchedule.assistance.triumvirate.filterTriumvirateMovements();
        }
    }
};