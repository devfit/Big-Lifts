Ext.ns("biglifts.views.liftSchedule.assistance", 'biglifts.liftSchedule.assistance');

biglifts.views.liftSchedule.assistance.continueToLog = function () {
    biglifts.views.liftSchedule.assistance.saveNoAssistance();
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
};

biglifts.views.liftSchedule.assistance.saveNoAssistance = function () {
    var assistanceRecord = {
        movement:null,
        assistanceType:'NONE',
        sets:null,
        reps:null,
        weight:null,
        timestamp:new Date().getTime()
    };

    biglifts.stores.assistance.ActivityLog.add(assistanceRecord);
    biglifts.stores.assistance.ActivityLog.sync();
};

biglifts.views.liftSchedule.assistance.showBoringButBig = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big'));
};

biglifts.views.liftSchedule.assistance.showTriumvirate = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('triumvirate'));
};

biglifts.views.liftSchedule.assistance.assistanceOptions = [
    {text:'None', assistanceType:'NONE', handler:biglifts.views.liftSchedule.assistance.continueToLog },
    {text:'Boring But Big', assistanceType:'BBB', handler:biglifts.views.liftSchedule.assistance.showBoringButBig},
    {text:'Triumvirate', assistanceType:'Triumvirate', handler:biglifts.views.liftSchedule.assistance.showTriumvirate}
];

biglifts.views.liftSchedule.assistance.nextButtonPressed = function () {
    var selection = Ext.getCmp('assistance-chooser-list').getSelection();
    if (selection != []) {
        selection[0].get('handler').call();
    }
};

biglifts.views.liftSchedule.assistance.returnToLift = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'));
};

biglifts.views.liftSchedule.assistance.getLastAssistanceType = function () {
    var assistanceType = null;
    util.withNoFilters(biglifts.stores.assistance.ActivityLog, function () {
        if (biglifts.stores.assistance.ActivityLog.getCount() > 0) {
            var highestTimestamp = 0;
            var lastAssistanceRecord = null;
            biglifts.stores.assistance.ActivityLog.each(function (record) {
                if (record.get('timestamp') > highestTimestamp) {
                    lastAssistanceRecord = record;
                    highestTimestamp = record.get('timestamp');
                }
            });

            assistanceType = lastAssistanceRecord.get('assistanceType');
        }
    });
    return assistanceType;
};

biglifts.views.liftSchedule.assistance.highlightLastChosenAssistance = function () {
    var selectedIndex = 0;
    var assistanceType = biglifts.views.liftSchedule.assistance.getLastAssistanceType();
    if (assistanceType !== null) {
        var assistanceRecord = _.find(biglifts.views.liftSchedule.assistance.assistanceOptions, function (option) {
            return option.assistanceType === assistanceType;
        });
        selectedIndex = _.indexOf(biglifts.views.liftSchedule.assistance.assistanceOptions, assistanceRecord);
    }

    Ext.getCmp('assistance-chooser-list').select(selectedIndex);
};

biglifts.liftSchedule.assistance.returnToAssistanceSelect = function(){
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('assistance-chooser'));
};

biglifts.views.liftSchedule.assistance.AssistanceChooser = {
    id:'assistance-chooser',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            biglifts.views.liftSchedule.assistance.highlightLastChosenAssistance();
            biglifts.navigation.setBackFunction(biglifts.views.liftSchedule.assistance.returnToLift);
        }
    },
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'Assistance',
            items:[
                {xtype:'button', text:'Back', ui:'back', handler:biglifts.views.liftSchedule.assistance.returnToLift},
                {xtype:'spacer'},
                {id:'assistance-chooser-next-button', xtype:'button', text:'Next', ui:'confirm', handler:biglifts.views.liftSchedule.assistance.nextButtonPressed}
            ]
        },
        {
            id:'assistance-chooser-list',
            xtype:'list',
            itemTpl:'{text}',
            data:biglifts.views.liftSchedule.assistance.assistanceOptions
        }
    ]
};