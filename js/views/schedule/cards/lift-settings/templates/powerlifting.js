Ext.ns('biglifts.liftSettings.templates');
biglifts.liftSettings.templates.powerlifting = {
    padding:5,
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:"Powerlifting",
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:biglifts.liftSettings.carouselBack
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
            xtype:'toolbar',
            docked:'top',
            ui:'light',
            items:[
                {xtype:'spacer'},
                {
                    xtype:'button',
                    ui:'confirm',
                    text:'Use',
                    handler:function () {
                        biglifts.liftSettings.setupLiftScheme("powerlifting");
                    }
                }
            ]
        },
        {
            html:'<div class="example-percentages"><span style="font-weight:bold">Pre-Meet (raw)</span>' +
                '<table>' +
                '<thead><tr><th>Week</th><th>Scheme</th></tr></thead>' +
                '<tbody class="example-percentages-table">' +
                '<tr><td>1</td><td>3x 70, 3x 80, 3x 90<p>1x 85 goal, 1x92.5 goal</p></td></tr>' +
                '<tr><td>2</td><td>5x 65, 5x 75, 5x 85</td></tr>' +
                '<tr><td>3</td><td>5x 75, 3x 85, 1x 95<p>1x 85 goal, 1x95 goal</p></td></tr>' +
                '<tr><td>4</td><td>5x 40, 5x 50, 5x 60</td></tr></tbody>' +
                '</table>' +
                '</div>',
            margin:"0 0 5 0"
        }
    ]
};