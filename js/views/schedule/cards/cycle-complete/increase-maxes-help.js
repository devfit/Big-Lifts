"use strict";
Ext.ns('wendler.views.liftSchedule', 'wendler.liftSchedule.increaseMaxes');

wendler.liftSchedule.increaseMaxes.closeIncreaseMaxesHelpScreen = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('cycle-complete'),
        {type:'slide', direction:'left'});
};

wendler.liftSchedule.increaseMaxes.bindInputElements = function(){
    _.each(Ext.getCmp('increase-maxes-help').element.query('input'), function (input) {
        Ext.get(input).addListener('blur', wendler.liftSchedule.increaseMaxes.updateCycleIncrease);
    })
};

wendler.liftSchedule.increaseMaxes.updateCycleIncrease = function (changedInput) {
    var name = changedInput.target.getAttribute('data-lift');
    var value = parseInt(changedInput.target.value);
    var liftRecord = wendler.stores.lifts.Lifts.findRecord('name', name);
    liftRecord.set('cycleIncrease', value);
    liftRecord.save();

    Ext.getCmp('increase-maxes-display-list').refresh();
    wendler.liftSchedule.increaseMaxes.bindInputElements();
};


wendler.views.liftSchedule.IncreaseMaxesHelp = {
    id:'increase-maxes-help',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.increaseMaxes.closeIncreaseMaxesHelpScreen);
        },
        initialize:function () {
            wendler.liftSchedule.increaseMaxes.bindInputElements();
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
                    handler:wendler.liftSchedule.increaseMaxes.closeIncreaseMaxesHelpScreen
                }
            ]
        },
        {
            id:'increase-maxes-display-list',
            xtype:'list',
            store:wendler.stores.lifts.EnabledLifts,
            itemTpl:'<table style="width:100%"><tbody><tr>' +
                '<td style="width:33%">{name}</td>' +
                '<td style="width:33%"><input style="color:green; width:50px" data-lift="{propertyName}" type="number" value="{cycleIncrease}"/></td>' +
                '<td style="width:34%">{max} → {[values.max+values.cycleIncrease]}</td>' +
                '</tr></tbody></table>'
        }
    ]
};