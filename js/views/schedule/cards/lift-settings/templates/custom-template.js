Ext.ns('biglifts.liftSettings.templates');
biglifts.liftSettings.showEditLiftPercentages = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-lift-percentages'), {type:'slide', direction:'left'});
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
            html:'Setup sets, reps, and percentages manually',
            margin:"0 0 5 0"
        },
        {
            id:'manual-percentages-button',
            xtype:'button',
            text:'Use',
            ui:'confirm',
            handler:biglifts.liftSettings.showEditLiftPercentages
        }
    ]
};