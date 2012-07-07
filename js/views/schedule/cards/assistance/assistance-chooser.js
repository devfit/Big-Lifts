Ext.ns("wendler.views.liftSchedule.assistance");

wendler.views.liftSchedule.assistance.continueToLog = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
    Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
};

wendler.views.liftSchedule.assistance.showBoringButBig = function () {
    console.log( "CALLED" );
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big'));
};

wendler.views.liftSchedule.assistance.assistanceOptions = [
    {text:'None', handler:wendler.views.liftSchedule.assistance.continueToLog },
    {text:'Boring But Big', handler:wendler.views.liftSchedule.assistance.showBoringButBig}
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

wendler.views.liftSchedule.assistance.AssistanceChooser = {
    id:'assistance-chooser',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            Ext.getCmp('assistance-chooser-list').select(0);
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