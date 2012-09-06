Ext.ns('wendler.views.liftSchedule', 'wendler.liftSettings', 'wendler.liftProgressions');
wendler.liftSettings.returnToLiftSelectFromSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide', direction:'right'});
};

wendler.liftSettings.showEditLiftPercentages = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-lift-percentages'), {type:'slide', direction:'left'});
};

wendler.liftSettings.carouselBack = function () {
    var liftSettings = Ext.getCmp('lift-settings');
    liftSettings.setActiveItem(liftSettings.getActiveIndex() - 1);
};

wendler.liftSettings.carouselForward = function () {
    var liftSettings = Ext.getCmp('lift-settings');
    liftSettings.setActiveItem(liftSettings.getActiveIndex() + 1);
};

wendler.liftProgressions.options = {
    "fresher":[
        Ext.create('LiftProgression', {week:1, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:1, set:2, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:1, set:3, reps:3, percentage:60}),
        Ext.create('LiftProgression', {week:1, set:4, reps:5, percentage:65}),
        Ext.create('LiftProgression', {week:1, set:5, reps:5, percentage:75}),
        Ext.create('LiftProgression', {week:1, set:6, reps:5, percentage:85}),
        Ext.create('LiftProgression', {week:2, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:2, set:2, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:2, set:3, reps:3, percentage:60}),
        Ext.create('LiftProgression', {week:2, set:4, reps:3, percentage:70}),
        Ext.create('LiftProgression', {week:2, set:5, reps:3, percentage:80}),
        Ext.create('LiftProgression', {week:2, set:6, reps:3, percentage:90}),
        Ext.create('LiftProgression', {week:3, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:3, set:2, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:3, set:3, reps:3, percentage:60}),
        Ext.create('LiftProgression', {week:3, set:4, reps:5, percentage:75}),
        Ext.create('LiftProgression', {week:3, set:5, reps:3, percentage:85}),
        Ext.create('LiftProgression', {week:3, set:6, reps:1, percentage:95}),
        Ext.create('LiftProgression', {week:4, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:2, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:3, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:4, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:5, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:4, set:6, reps:5, percentage:60})
    ],
    "heavier":[
        Ext.create('LiftProgression', {week:1, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:1, set:2, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:1, set:3, reps:3, percentage:60}),
        Ext.create('LiftProgression', {week:1, set:4, reps:5, percentage:75}),
        Ext.create('LiftProgression', {week:1, set:5, reps:5, percentage:80}),
        Ext.create('LiftProgression', {week:1, set:6, reps:5, percentage:85}),
        Ext.create('LiftProgression', {week:2, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:2, set:2, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:2, set:3, reps:3, percentage:60}),
        Ext.create('LiftProgression', {week:2, set:4, reps:3, percentage:80}),
        Ext.create('LiftProgression', {week:2, set:5, reps:3, percentage:85}),
        Ext.create('LiftProgression', {week:2, set:6, reps:3, percentage:90}),
        Ext.create('LiftProgression', {week:3, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:3, set:2, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:3, set:3, reps:3, percentage:60}),
        Ext.create('LiftProgression', {week:3, set:4, reps:5, percentage:75}),
        Ext.create('LiftProgression', {week:3, set:5, reps:3, percentage:85}),
        Ext.create('LiftProgression', {week:3, set:6, reps:1, percentage:95}),
        Ext.create('LiftProgression', {week:4, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:2, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:3, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:4, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:5, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:4, set:6, reps:5, percentage:60})
    ],
    "powerlifting":[
        Ext.create('LiftProgression', {week:1, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:1, set:2, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:1, set:3, reps:3, percentage:60}),
        Ext.create('LiftProgression', {week:1, set:4, reps:3, percentage:70}),
        Ext.create('LiftProgression', {week:1, set:5, reps:3, percentage:80}),
        Ext.create('LiftProgression', {week:1, set:6, reps:3, percentage:90}),
        Ext.create('LiftProgression', {week:2, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:2, set:2, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:2, set:3, reps:3, percentage:60}),
        Ext.create('LiftProgression', {week:2, set:4, reps:5, percentage:65}),
        Ext.create('LiftProgression', {week:2, set:5, reps:5, percentage:75}),
        Ext.create('LiftProgression', {week:2, set:6, reps:5, percentage:85}),
        Ext.create('LiftProgression', {week:3, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:3, set:2, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:3, set:3, reps:3, percentage:60}),
        Ext.create('LiftProgression', {week:3, set:4, reps:5, percentage:75}),
        Ext.create('LiftProgression', {week:3, set:5, reps:3, percentage:85}),
        Ext.create('LiftProgression', {week:3, set:6, reps:1, percentage:95}),
        Ext.create('LiftProgression', {week:4, set:1, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:2, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:3, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:4, reps:5, percentage:40}),
        Ext.create('LiftProgression', {week:4, set:5, reps:5, percentage:50}),
        Ext.create('LiftProgression', {week:4, set:6, reps:5, percentage:60})
    ]
};

wendler.liftSettings.setupLiftScheme = function (scheme) {
    //TODO: Figure out weird saving behavior. On the very first load, and only on mobile safari, if the records
    //being saved are the *same* as those that exist, on page reload, the count of the store will be 0.
    //It's almost as if the records are marked to be deleted twice.
    var prebuiltVariation = wendler.liftProgressions.options[scheme];
    wendler.stores.lifts.LiftProgression.clearFilter();
    wendler.stores.lifts.LiftProgression.each(function (m) {
        var newProgression = _.find(prebuiltVariation, function (r) {
            return r.data.set === m.data.set && r.data.week === m.data.week;
        });

        m.set('reps', newProgression.data.reps);
        m.set('percentage', newProgression.data.percentage);
        m.save();
    });

    Ext.Msg.alert('Lifts Updated', 'The lift scheme has been updated', Ext.emptyFn);
};

wendler.views.liftSchedule.LiftSettings = {
    id:'lift-settings',
    xtype:'carousel',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftSettings.returnToLiftSelectFromSettings);
        }
    },
    defaults:{
        xtype:'formpanel',
        scroll:'vertical'
    },
    items:[
        {
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
                            handler:wendler.liftSettings.returnToLiftSelectFromSettings
                        },
                        {xtype:'spacer'},
                        {
                            text:'Next',
                            ui:'forward',
                            handler:wendler.liftSettings.carouselForward
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
                        wendler.liftSettings.setupLiftScheme("fresher");
                    }
                }
            ]
        },
        {
            padding:5,
            items:[
                {
                    xtype:'toolbar',
                    docked:'top',
                    title:"Heavier",
                    items:[
                        {
                            text:'Back',
                            ui:'back',
                            handler:wendler.liftSettings.carouselBack
                        },
                        {xtype:'spacer'},
                        {
                            text:'Next',
                            ui:'forward',
                            handler:wendler.liftSettings.carouselForward
                        }
                    ]
                },
                {
                    html:'<div class="example-percentages">' +
                        '<table>' +
                        '<thead><tr><th>Week</th><th>Scheme</th></tr></thead>' +
                        '<tbody class="example-percentages-table">' +
                        '<tr><td>1</td><td>5x 75, 5x 80, 5x 85</td></tr>' +
                        '<tr><td>2</td><td>3x 80, 3x 85, 3x 90</td></tr>' +
                        '<tr><td>3</td><td>5x 75, 3x 85, 1x 95</td></tr>' +
                        '<tr><td>4</td><td>5x 40, 5x 50, 5x 60</td></tr></tbody>' +
                        '</table>' +
                        '</div>',
                    margin:"0 0 5 0"
                },
                {
                    id:'progression-option-2',
                    xtype:'button',
                    ui:'confirm',
                    text:'Use',
                    handler:function () {
                        wendler.liftSettings.setupLiftScheme("heavier");
                    }
                }
            ]
        },
        {
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
                            handler:wendler.liftSettings.carouselBack
                        },
                        {xtype:'spacer'},
                        {
                            text:'Next',
                            ui:'forward',
                            handler:wendler.liftSettings.carouselForward
                        }
                    ]
                },
                {
                    html:'<div class="example-percentages">' +
                        '<table>' +
                        '<thead><tr><th>Week</th><th>Scheme</th></tr></thead>' +
                        '<tbody class="example-percentages-table">' +
                        '<tr><td>1</td><td>3x 70, 3x 80, 3x 90<p>2/3 singles</p></td></tr>' +
                        '<tr><td>2</td><td>5x 65, 5x 75, 5x 85</td></tr>' +
                        '<tr><td>3</td><td>5x 75, 3x 85, 1x 95<p>1/2 singles</p></td></tr>' +
                        '<tr><td>4</td><td>5x 40, 5x 50, 5x 60</td></tr></tbody>' +
                        '</table>' +
                        '</div>',
                    margin:"0 0 5 0"
                },
                {
                    id:'use-powerlifting-template-button',
                    xtype:'button',
                    ui:'confirm',
                    text:'Use',
                    handler:function () {
                        wendler.liftSettings.setupLiftScheme("powerlifting");
                    }
                }
            ]
        },
        {
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
                            handler:wendler.liftSettings.carouselBack
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
                    handler:wendler.liftSettings.showEditLiftPercentages
                }
            ]
        }
    ]
};