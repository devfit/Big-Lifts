Ext.ns('wendler.views.liftSchedule', 'wendler.controller.liftSettings');
wendler.controller.liftSettings.returnToLiftSelectFromSettings = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'), {type:'slide', direction:'right'});
};

wendler.controller.liftSettings.showEditLiftPercentages = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-lift-percentages'), {type:'slide', direction:'left'});
};

wendler.controller.liftSettings.optionButtonPressed = function (option) {
    //TODO: Figure out weird saving behavior. On the very first load, and only on mobile safari, if the records
    //being saved are the *same* as those that exist, on page reload, the count of the store will be 0.
    //It's almost as if the records are marked to be deleted twice.
    var prebuiltVariation = wendler.liftProgressions.options[(option - 1)];
    wendler.stores.lifts.LiftProgression.clearFilter();
    wendler.stores.lifts.LiftProgression.each(function (m) {
        var newProgression = _.find(prebuiltVariation, function(r){
           return r.data.set === m.data.set && r.data.week === m.data.week;
        });

        m.set('reps', newProgression.data.reps);
        m.set('percentage', newProgression.data.percentage);
        m.save();
    });

    Ext.Msg.alert('Lifts Updated', 'The lift schedule has been updated with new progressions', Ext.emptyFn);
};

wendler.views.liftSchedule.LiftSettings = {
    id:'lift-settings',
    xtype:'panel',
    bodyPadding:5,
    listeners:{
        beforeshow:function () {
            wendler.navigation.setBackFunction(wendler.controller.liftSettings.returnToLiftSelectFromSettings);
        }
    },
    items:[
        {
            html:'The Wendler 5/3/1 book offers two working-set progression options'
        },
        {
            xtype:'panel',
            layout:'hbox',
            bodyPadding:0,
            defaults:{
                bodyPadding:3,
                flex:1
            },
            items:[
                {
                    html:'<div class="example-percentages">' +
                        '<p>"Fresher"</p>' +
                        '<table>' +
                        '<thead><tr><th>Wk</th><th>%</th></tr></thead>' +
                        '<tbody class="example-percentages-table">' +
                        '<tr><td>1</td><td>65, 75, 85</td></tr>' +
                        '<tr><td>2</td><td>70, 80, 90</td></tr>' +
                        '<tr><td>3</td><td>75, 85, 95</td></tr>' +
                        '<tr><td>4</td><td>40, 50, 60</td></tr></tbody>' +
                        '</table>' +
                        '</div>'
                },
                {
                    html:'<div class="example-percentages">' +
                        '<p>"Heavier"</p>' +
                        '<table>' +
                        '<thead><tr><th>Wk</th><th>%</th></tr></thead>' +
                        '<tbody class="example-percentages-table">' +
                        '<tr><td>1</td><td>75, 80, 85</td></tr>' +
                        '<tr><td>2</td><td>80, 85, 90</td></tr>' +
                        '<tr><td>3</td><td>75, 85, 95</td></tr>' +
                        '<tr><td>4</td><td>40, 50, 60</td></tr></tbody>' +
                        '</table>' +
                        '</div>'
                }
            ]
        },
        {
            xtype:'panel',
            layout:'hbox',
            height:50,
            defaults:{
                xtype:'panel',
                flex:1,
                bodyPadding:3
            },
            items:[
                {
                    items:[
                        {
                            id:'progression-option-1',
                            xtype:'button',
                            text:'Option 1',
                            handler:function () {
                                wendler.controller.liftSettings.optionButtonPressed(1);
                            }
                        }
                    ]
                },
                {
                    items:[
                        {
                            id:'progression-option-2',
                            xtype:'button',
                            text:'Option 2',
                            handler:function () {
                                wendler.controller.liftSettings.optionButtonPressed(2);
                            }
                        }
                    ]
                }
            ]
        },
        {
            id:'manual-percentages-button',
            xtype:'button',
            text:'Manual',
            ui:'decline',
            handler:wendler.controller.liftSettings.showEditLiftPercentages
        }
    ],
    dockedItems:[
        {
            xtype:'toolbar',
            title:'Config',
            items:[
                {
                    id:'lift-settings-back-button',
                    text:'Back',
                    ui:'back',
                    handler:wendler.controller.liftSettings.returnToLiftSelectFromSettings
                }
            ]
        }
    ]
};