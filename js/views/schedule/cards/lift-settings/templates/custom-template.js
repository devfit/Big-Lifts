Ext.ns('biglifts.liftSettings.templates');
biglifts.liftSettings.showEditLiftPercentages = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-lift-percentages'));
};

biglifts.liftSettings.templates.custom = {
    padding:5,
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:"Custom",
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:biglifts.liftSettings.carouselBack
                }
            ]
        },
        {
            xtype:'toolbar',
            docked:'top',
            ui:'light',
            items:[
                {xtype:'spacer'},
                {
                    xtype:'button',
                    ui:'confirm',
                    text:'Use',
                    handler:biglifts.liftSettings.showEditLiftPercentages
                }
            ]
        },
        {
            html:'Setup sets, reps, and percentages manually',
            margin:"0 0 5 0"
        }
    ]
};