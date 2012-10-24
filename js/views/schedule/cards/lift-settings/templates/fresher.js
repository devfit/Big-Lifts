Ext.ns('biglifts.liftSettings.templates');

biglifts.liftSettings.templates.fresher = {
    padding:5,
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:"Fresher",
            items:[
                {
                    id:'lift-settings-back-button',
                    text:'Back',
                    ui:'back',
                    handler:biglifts.liftSettings.returnToLiftSelectFromSettings
                },
                {xtype:'spacer'},
                {
                    text:'Next',
                    ui:'forward',
                    handler:biglifts.liftSettings.carouselForward
                }
            ]
        },
        {
            html:'<div class="example-percentages">' +
                '<table>' +
                '<thead><tr><th>Week</th><th>Scheme</th></tr></thead>' +
                '<tbody class="example-percentages-table">' +
                '<tr><td>1</td><td>5x 65, 5x 75, 5x 85</td></tr>' +
                '<tr><td>2</td><td>3x 70, 3x 80, 3x 90</td></tr>' +
                '<tr><td>3</td><td>5x 75, 3x 85, 1x 95</td></tr>' +
                '<tr><td>4</td><td>5x 40, 5x 50, 5x 60</td></tr></tbody>' +
                '</table>' +
                '</div>',
            margin:"0 0 5 0"
        },
        {
            id:'progression-option-1',
            xtype:'button',
            ui:'confirm',
            text:'Use',
            handler:function () {
                biglifts.liftSettings.setupLiftScheme("fresher");
            }
        }
    ]
};