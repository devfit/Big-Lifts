"use strict";
Ext.define('biglifts.views.AssistanceChooser', {
    extend: 'Ext.Panel',
    continueToLog: function () {
        this.saveNoAssistance();
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
    },
    highlightLastChosenAssistance: function () {
        var selectedIndex = 0;
        var assistanceType = biglifts.stores.assistance.ActivityLog.getLastAssistanceType();
        if (assistanceType !== null) {
            var assistanceRecord = _.find(this.assistanceOptions, function (option) {
                return option.assistanceType === assistanceType;
            });
            selectedIndex = _.indexOf(this.assistanceOptions, assistanceRecord);
        }

        var assistanceList = Ext.getCmp('assistance-chooser-list');
        if (assistanceList) {
            assistanceList.select(selectedIndex);
        }
    },
    nextButtonPressed: function () {
        var selection = Ext.getCmp('assistance-chooser-list').getSelection();
        if (selection != []) {
            selection[0].get('handler').call();
        }
    },
    saveNoAssistance: function () {
        var assistanceRecord = {
            movement: null,
            assistanceType: 'NONE',
            sets: null,
            reps: null,
            weight: null,
            timestamp: new Date().getTime()
        };

        biglifts.stores.assistance.ActivityLog.add(assistanceRecord);
        biglifts.stores.assistance.ActivityLog.sync();
    },
    showLiftChooserFor: function (assistanceId, title) {
        Ext.getCmp('assistance-lift-chooser').showLiftChooser(assistanceId, title);
    },
    _buildAssistanceOptions: function () {
        var me = this;
        return [
            {text: 'None', assistanceType: 'NONE', handler: Ext.bind(me.continueToLog, me) },
            {text: '5x10', assistanceType: 'BBB', handler: function () {
                me.showLiftChooserFor('boring-but-big', '5x10');
            }},
            {text: 'Bodyweight', assistanceType: 'Bodyweight', handler: function () {
                me.showLiftChooserFor('bodyweight', 'Bodyweight');
            }},
            {text: 'Simplest Strength Template', assistanceType: 'SST', handler: function () {
                me.showLiftChooserFor('sst', 'SST');
            }},
            {text: 'Custom', assistanceType: 'Custom', handler: function () {
                me.showLiftChooserFor('custom-assistance', 'Custom');
            }}
        ];
    },
    config: {
        id: 'assistance-chooser',
        xtype: 'panel',
        layout: 'fit',
        listeners: {
            painted: function () {
                this.highlightLastChosenAssistance();
                biglifts.navigation.unbindBackEvent();
            },
            initialize: function () {
                var me = this;
                me.assistanceOptions = me._buildAssistanceOptions();
                me.add([
                    {
                        docked: 'top',
                        xtype: 'toolbar',
                        title: 'Assistance',
                        items: [
                            {xtype: 'spacer'},
                            {id: 'assistance-chooser-next-button', xtype: 'button', text: 'Next', ui: 'confirm', handler: me.nextButtonPressed}
                        ]
                    },
                    {
                        id: 'assistance-chooser-list',
                        xtype: 'list',
                        itemTpl: '{text}',
                        data: me.assistanceOptions
                    }
                ]);
            }
        }
    }
});