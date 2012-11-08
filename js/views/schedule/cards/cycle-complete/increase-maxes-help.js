"use strict";
Ext.ns('biglifts.views.liftSchedule', 'biglifts.liftSchedule.increaseMaxes');

biglifts.liftSchedule.increaseMaxes.closeIncreaseMaxesHelpScreen = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('cycle-complete'),
        {type:'slide', direction:'left'});
};

biglifts.liftSchedule.increaseMaxes.bindInputElements = function(){
    _.each(Ext.getCmp('increase-maxes-help').element.query('input'), function (input) {
        Ext.get(input).addListener('blur', biglifts.liftSchedule.increaseMaxes.updateCycleIncrease);
    })
};

biglifts.liftSchedule.increaseMaxes.updateCycleIncrease = function (changedInput) {
    var name = changedInput.target.getAttribute('data-lift');
    var value = parseInt(changedInput.target.value);
    var liftRecord = biglifts.stores.lifts.Lifts.findRecord('name', name);
    liftRecord.set('cycleIncrease', value);
    liftRecord.save();

    Ext.getCmp('increase-maxes-display-list').refresh();
    biglifts.liftSchedule.increaseMaxes.bindInputElements();
};


biglifts.views.liftSchedule.IncreaseMaxesHelp = {
    id:'increase-maxes-help',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            biglifts.stores.lifts.Lifts.filter('enabled', true);
            biglifts.navigation.setBackFunction(biglifts.liftSchedule.increaseMaxes.closeIncreaseMaxesHelpScreen);
        },
        initialize:function () {
            biglifts.liftSchedule.increaseMaxes.bindInputElements();
        }
    },
    items:[
        {
            docked:'top',
            xtype:'toolbar',
            title:'Max Increases',
            items:[
                {
                    xtype:'button',
                    text:'Back',
                    ui:'back',
                    handler:biglifts.liftSchedule.increaseMaxes.closeIncreaseMaxesHelpScreen
                }
            ]
        },
        {
            id:'increase-maxes-display-list',
            xtype:'list',
            store:biglifts.stores.lifts.Lifts,
            itemTpl:'<table style="width:100%"><tbody><tr>' +
                '<td style="width:33%">{name}</td>' +
                '<td style="width:33%"><input style="color:green; width:50px" data-lift="{propertyName}" type="number" value="{cycleIncrease}"/></td>' +
                '<td style="width:34%">{max} → {[values.max+values.cycleIncrease]}</td>' +
                '</tr></tbody></table>'
        }
    ]
};