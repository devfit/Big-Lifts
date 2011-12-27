"use strict";
Ext.ns('wendler.views', 'wendler.settings.controller');
wendler.settings.controller.resetToDefaults = function() {
    wendler.stores.Settings.first().set(wendler.defaults.settings);
    wendler.stores.Settings.sync();
    Ext.getCmp('settings-form').load(Ext.ModelMgr.create(wendler.defaults.settings, 'Settings'));
};

wendler.settings.controller.setLiftPercentages = function(){
    Ext.getCmp('settings').setActiveItem(Ext.getCmp('edit-percentages-lift-schedule'));
};

wendler.settings.controller.reloadForm = function() {
    Ext.getCmp('settings-form').load(wendler.stores.Settings.first());
    Ext.getCmp('settings-form').hasBeenLoaded = true;
};

new Ext.form.FormPanel({
    title: 'Settings',
    id: 'settings-form',
    scroll: util.scrolling.lockedVerticalScroller,
    dockedItems:[
        {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Settings'
        }
    ],
    listeners: {
        afterlayout: wendler.settings.controller.reloadForm
    },
    items:[
        {
            xtype: 'fieldset',
            style: 'margin-top: 0',
            defaults: {
                labelWidth: '50%',
                listeners:{
                    change:function() {
                        var settingsForm = Ext.getCmp('settings-form');
                        if (!settingsForm.hasBeenLoaded) {
                            return;
                        }

                        var settingsRecord = wendler.stores.Settings.first();
                        settingsRecord.set(settingsForm.getValues());
                        settingsRecord.save();
                    }
                }
            },
            items:[
                {
                    xtype: 'togglefield',
                    name: 'show-warmup-sets',
                    label: "Show warmup sets"
                },
                {
                    xtype: 'selectfield',
                    name: 'units',
                    label: "Units",
                    options: wendler.settings.options.units
                },
                {
                    xtype: 'selectfield',
                    name: 'rounding-value',
                    label: 'Round To',
                    options: wendler.settings.options.roundingValues
                },
                {
                    xtype: 'selectfield',
                    name: 'rounding-type',
                    label: 'Rounding Type',
                    options: wendler.settings.options.roundingType
                },
                {
                    xtype: 'togglefield',
                    name: 'use-training-max',
                    label: 'Use 90% training max'
                },
                {
                    xtype: 'panel',
                    html: '<h1 style="text-align:center;margin-top:-7px">...</h1>'
                }
            ]
        },
        {
            xtype: 'button',
            text: 'Set lift percentages',
            handler: wendler.settings.controller.setLiftPercentages
        },
        {
            xtype: 'spacer',
            height: 15
        },
        {
            xtype: 'button',
            ui: 'decline',
            text: 'Reset',
            handler: wendler.settings.controller.resetToDefaults
        }
    ]
});

wendler.views.Settings = Ext.extend(Ext.Panel, {
    id: 'settings',
    title: 'Settings',
    iconCls: 'settings',
    layout: 'card',
    cardSwitchAnimation:'slide',
    items:[
        Ext.getCmp('settings-form'),
        Ext.getCmp('edit-percentages-lift-schedule')
    ]
});