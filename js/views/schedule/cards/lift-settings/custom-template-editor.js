"use strict";
Ext.define('biglifts.views.templates.CustomWeekEditor', {
    extend: 'Ext.tab.Panel',
    switchLiftWeek: function (container, newValue) {
        var lists = this.getWeekLists();
        this.currentWeek = lists.indexOf(newValue) + 1;
        this.updateLiftPercentaqes();
    },
    createTab: function (week) {
        var me = this;
        return {
            xtype: 'panel',
            layout: 'vbox',
            title: week,
            items: [
                {
                    flex: 4,
                    xtype: 'list',
                    store: biglifts.stores.lifts.LiftProgression,
                    itemCls: 'lift-percentage-row',
                    itemTpl: '<table width="100%"><tbody><tr>' +
                        '<td width="60%"><div class="{[biglifts.liftSchedule.liftTemplate.getLiftRowClass(values)]}">' +
                        '<span class="reps">{reps}</span> <span class="percentage">{percentage}%</span></div>' +
                        '<td width="40%" class="no-delete-button"></td>' +
                        '<td width="40%" class="delete-button-holder hidden"></td>' +
                        '</tr></tbody></table>',
                    listeners: {
                        initialize: function () {
                            biglifts.components.addSwipeToDelete(this, Ext.bind(me.showProgression, me),
                                Ext.bind(me.deleteLiftProgression, me), Ext.emptyFn, '.no-delete-button');
                        }
                    }
                },
                {
                    xtype: 'panel',
                    padding: 3,
                    items: [
                        {
                            xtype: 'button',
                            text: 'Add set',
                            handler: Ext.bind(me.addSet, me)
                        }
                    ]
                }
            ]
        };
    },
    returnToLiftSettings: function () {
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-settings'));
    },
    updateLiftPercentaqes: function () {
        if (this.currentWeek) {
            biglifts.stores.lifts.LiftProgression.clearFilter();
            biglifts.stores.lifts.LiftProgression.filter("week", this.currentWeek);
        }
    },
    addSet: function () {
        var newSet = biglifts.stores.lifts.LiftProgression.max('set') + 1;
        biglifts.stores.lifts.LiftProgression.add({
            week: this.currentWeek,
            set: newSet,
            reps: 0,
            percentage: 0,
            amrap: false,
            warmup: false
        });
        biglifts.stores.lifts.LiftProgression.sync();
        Ext.getCmp('edit-progression').showEditLiftProgression(biglifts.stores.lifts.LiftProgression.last());
    },
    deleteLiftProgression: function (view, index) {
        var set = index + 1;
        var liftProgression = biglifts.stores.lifts.LiftProgression.findRecord('set', set);

        biglifts.stores.lifts.LiftProgression.remove(liftProgression);
        biglifts.stores.lifts.LiftProgression.sync();
    },
    showProgression: function (view, index) {
        Ext.getCmp('edit-progression').showEditLiftProgression(biglifts.stores.lifts.LiftProgression.findRecord('set', index + 1));
    },
    getWeekLists: function () {
        var listFilter = new Ext.util.Filter({
            filterFn: function (item) {
                return item.getBaseCls() === "x-panel";
            }
        });
        return this.getItems().filter(listFilter);
    },
    config: {
        id: 'edit-lift-percentages',
        title: 'Edit',
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title: 'Weeks',
                items: [
                    {
                        xtype: 'button',
                        text: 'Back',
                        ui: 'back',
                        listeners: {
                            initialize: function () {
                                this.setHandler(Ext.getCmp('edit-lift-percentages').returnToLiftSettings);
                            }
                        }
                    }
                ]
            }
        ],
        listeners: {
            painted: function () {
                biglifts.navigation.setBackFunction(this.returnToLiftSettings);
                this.updateLiftPercentaqes();
            },
            initialize: function () {
                this.currentWeek = 1;

                var me = this;
                me.add([
                    me.createTab(1),
                    me.createTab(2),
                    me.createTab(3),
                    me.createTab(4)
                ]);
                this.addListener('activeitemchange', Ext.bind(this.switchLiftWeek, this));
            }
        }
    }
});
