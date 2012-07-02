Ext.ns("wendler.views.liftSchedule.assistance");

wendler.views.liftSchedule.assistance.assistanceOptions = [
    {text:'None', value:'none'},
    {text:'Boring But Big', value:'none'}
];

wendler.views.liftSchedule.assistance.AssistanceChooser = {
    xtype:'formpanel',
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'Assistance',
            items:[
                {xtype:'button', text:'Back', ui:'back'},
                {xtype:'spacer'},
                {xtype:'button', text:'Next', ui:'confirm'}
            ]
        },
        {
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            items:[
                {
                    xtype:'selectfield',
                    name:'assistance-program',
                    label:'Type',
                    options:wendler.views.liftSchedule.assistance.assistanceOptions
                }
            ]
        }
    ]
};