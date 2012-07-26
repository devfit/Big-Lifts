Ext.ns("wendler.views.liftSchedule.assistance");

wendler.views.liftSchedule.assistance.continueToLog = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
};

wendler.views.liftSchedule.assistance.showBoringButBig = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big'));
};

wendler.views.liftSchedule.assistance.assistanceOptions = [
    {text:'None', assistanceType:'NONE', handler:wendler.views.liftSchedule.assistance.continueToLog },
    {text:'Boring But Big', assistanceType:'BBB', handler:wendler.views.liftSchedule.assistance.showBoringButBig}
];

wendler.views.liftSchedule.assistance.nextButtonPressed = function () {
    var selection = Ext.getCmp('assistance-chooser-list').getSelection();
    if (selection != []) {
        selection[0].get('handler').call();
    }
};

wendler.views.liftSchedule.assistance.returnToLift = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'));
};

wendler.views.liftSchedule.assistance.getLastAssistanceType = function () {
    if (wendler.stores.assistance.ActivityLog.getCount() > 0) {
        var highestTimestamp = 0;
        var lastAssistanceRecord = null;
        wendler.stores.assistance.ActivityLog.each(function (record) {
            if (record.get('timestamp') > highestTimestamp) {
                lastAssistanceRecord = record;
                highestTimestamp = record.get('timestamp');
            }
        });

        return lastAssistanceRecord.get('assistanceType');
    }
    else {
        return null;
    }
};

wendler.views.liftSchedule.assistance.highlightLastChosenAssistance = function () {
    var selectedIndex = 0;
    var assistanceType = wendler.views.liftSchedule.assistance.getLastAssistanceType();
    if (assistanceType !== null) {
        var assistanceRecord = _.find(wendler.views.liftSchedule.assistance.assistanceOptions, function (option) {
            return option.assistanceType === assistanceType;
        });
        selectedIndex = _.indexOf(wendler.views.liftSchedule.assistance.assistanceOptions, assistanceRecord);
    }

    Ext.getCmp('assistance-chooser-list').select(selectedIndex);
};

wendler.views.liftSchedule.assistance.AssistanceChooser = {
    id:'assistance-chooser',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            wendler.views.liftSchedule.assistance.highlightLastChosenAssistance();
            wendler.navigation.setBackFunction(wendler.views.liftSchedule.assistance.returnToLift);
        }
    },
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'Assistance',
            items:[
                {xtype:'button', text:'Back', ui:'back', handler:wendler.views.liftSchedule.assistance.returnToLift},
                {xtype:'spacer'},
                {xtype:'button', text:'Next', ui:'confirm', handler:wendler.views.liftSchedule.assistance.nextButtonPressed}
            ]
        },
        {
            id:'assistance-chooser-list',
            xtype:'list',
            itemTpl:'{text}',
            data:wendler.views.liftSchedule.assistance.assistanceOptions
        }
    ]
};