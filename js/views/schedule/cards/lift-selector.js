Ext.define('biglifts.views.LiftSelector', {
    extend: 'Ext.tab.Panel',
    changeWeek: function (week) {
        this.down('#topToolbar').setTitle('Week ' + week);
        biglifts.liftSchedule.currentWeek = week;
    },
    getWeekLists: function () {
        var listFilter = new Ext.util.Filter({
            filterFn: function (item) {
                return item.getBaseCls() === "x-list";
            }
        });
        return this.getItems().filter(listFilter);
    },
    getStartingWeek: function () {
        var weeksCompleted = {};
        biglifts.stores.lifts.LiftCompletion.each(function (record) {
            var week = record.data.week;
            if (!_.has(weeksCompleted, week)) {
                weeksCompleted[week] = true;
            }

            var associatedLift = biglifts.stores.lifts.Lifts.findRecord('propertyName', record.get('liftPropertyName'));
            if (associatedLift) {
                var enabled = associatedLift.get('enabled');
                if (enabled) {
                    weeksCompleted[week] &= record.data.completed;
                }
            }
        });

        var lastNotCompletedWeek = _.find(_.keys(weeksCompleted), function (key) {
            return !weeksCompleted[key];
        });

        lastNotCompletedWeek = _.isUndefined(lastNotCompletedWeek) ? _.last(_.keys(weeksCompleted)) : lastNotCompletedWeek;
        return parseInt(lastNotCompletedWeek);
    },
    handleWeekChange: function (container, newValue, oldValue, opts) {
        this.changeWeek(this.getWeekLists().indexOf(newValue) + 1);
    },
    liftHasBeenCompleted: function (week, liftIndex) {
        var liftPropertyName = biglifts.stores.lifts.Lifts.getAt(liftIndex).get('propertyName');
        var liftCompletion = biglifts.stores.lifts.LiftCompletion.findLiftCompletionByPropertyAndWeek(liftPropertyName, week);
        return liftCompletion.get('completed');
    },
    refreshLiftSelectorLifts: function () {
        this.getWeekLists().each(function (list) {
            list.refresh();
        });
    },
    setupCheckedTitleWeeks: function () {
        var startingWeekIndex = this.getStartingWeek() - 1;
        var tabs = Ext.getCmp('lift-selector').down('.tabbar').query('.tab');

        if (startingWeekIndex === 0) {
            _.each(tabs, function (tab) {
                tab.removeCls('completed');
            });
        }
        else {
            var completedWeekTabs = _.first(tabs, startingWeekIndex);
            _.each(completedWeekTabs, function (tab) {
                tab.addCls('completed');
            });
        }
    },
    setupLiftSelector: function () {
        this.setupListDoneIcons();
        var cycle = biglifts.stores.CurrentCycle.first().data.cycle;
        this.cycleChangeButton.setText("Cycle " + cycle);
    },
    setupListDoneIcons: function () {
        var liftLists = this.query('list');
        for (var weekIndex = 0; weekIndex < liftLists.length; weekIndex++) {
            var liftList = liftLists[weekIndex];
            var liftListEl = liftList.element;
            if (liftListEl) {
                var listItems = liftListEl.query('.x-list-item');
                for (var listItemIndex = 0; listItemIndex < listItems.length; listItemIndex++) {
                    var listItem = listItems[listItemIndex];
                    if (this.liftHasBeenCompleted(weekIndex + 1, listItemIndex)) {
                        Ext.get(listItem).addCls('done');
                    }
                    else {
                        Ext.get(listItem).removeCls('done');
                    }
                }
            }
        }
    },
    showLiftsCompletedScreen: function () {
        biglifts.liftSchedule.lastActiveTab = Ext.getCmp('lift-schedule').getActiveItem();
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('cycle-complete'));
    },
    showLiftScheduleSettings: function () {
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-settings'));
    },
    viewLift: function (view, index) {
        var record = biglifts.stores.lifts.Lifts.getAt(index);

        Ext.getCmp('lift-template-toolbar').setTitle(record.get('name'));
        biglifts.liftSchedule.currentLiftProperty = record.get('propertyName');

        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-template'));
    },
    bindListeners: function () {
        biglifts.stores.lifts.LiftCompletion.addListener('beforesync', this.setupListDoneIcons, this);
        biglifts.stores.lifts.Lifts.addListener('beforesync', this.refreshLiftSelectorLifts, this);
        this.addListener('activeitemchange', this.handleWeekChange, this);
    },
    destroyListeners: function () {
        biglifts.stores.lifts.LiftCompletion.removeListener('beforesync', this.setupListDoneIcons, this);
        biglifts.stores.lifts.Lifts.removeListener('beforesync', this.refreshLiftSelectorLifts, this);
    },
    config: {
        id: 'lift-selector',
        listeners: {
            painted: function () {
                biglifts.stores.lifts.Lifts.clearFilter(true);
                biglifts.stores.lifts.Lifts.filter('enabled', true);
                this.setupLiftSelector();
                this.setupCheckedTitleWeeks();

                biglifts.navigation.unbindBackEvent();

                if (!this._painted) {
                    this._painted = true;
                    this.bindListeners();
                }
            },
            destroy: function () {
                this.destroyListeners();
            },
            initialize: function () {
                biglifts.liftSchedule.lastActiveTab = null;
                biglifts.liftSchedule.currentLiftProperty = null;
                biglifts.liftSchedule.currentWeek = null;
                this.changeWeek(this.getStartingWeek());
                this.setActiveItem(this.getStartingWeek() - 1);

                this.settingsButton = this.down('#topToolbar').add({
                    iconCls: 'settings',
                    iconMask: true,
                    ui: 'action',
                    handler: Ext.bind(this.showLiftScheduleSettings, this)
                });

                this.down('#topToolbar').add({xtype: 'spacer'});

                this.cycleChangeButton = this.down('#topToolbar').add({
                    xtype: 'button',
                    ui: 'action',
                    text: 'Cycle 1',
                    cls: 'cycle-change-button',
                    handler: Ext.bind(this.showLiftsCompletedScreen, this)
                });

                for (var i = 1; i <= 4; i++) {
                    this.add({
                        title: i,
                        xtype: 'list',
                        store: biglifts.stores.lifts.Lifts,
                        itemTpl: '<strong>{name}</strong>',
                        onItemDisclosure: true,
                        listeners: {
                            itemtap: Ext.bind(this.viewLift, this)
                        }
                    });
                }
            }
        },
        items: [
            {
                xtype: 'toolbar',
                itemId: 'topToolbar',
                docked: 'top',
                title: 'Week 1'
            }
        ]
    }
});