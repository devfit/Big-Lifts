Ext.define('biglifts.views.ss.Workouts', {
    extend: 'Ext.tab.Panel',
    showRestTimer: function () {
        var parent = this.getParent();
        parent.setActiveItem(parent.restTimer);
    },
    markWorkoutCompleted: function () {
        var newWorkoutId = biglifts.stores.ss.Log.getNewWorkoutId();
        biglifts.stores.ss.WorkoutStore.each(function (w) {
            var lift = biglifts.stores.ss.Lifts.findRecord('id', w.get('lift_id'));

            biglifts.stores.ss.Log.add({
                name: lift.get("name"),
                weight: lift.get('weight'),
                sets: w.get('sets'),
                reps: w.get('reps'),
                units: 'lbs',
                timestamp: new Date().getTime(),
                workout_id: newWorkoutId
            });

            lift.set('weight', lift.get('weight') + lift.get('increase'));
        });
        biglifts.stores.ss.Log.sync();
        biglifts.stores.ss.Lifts.sync();
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('ss-track-tab'));
    },
    setToolbarTitle: function () {
        this.workoutToolbar.setTitle('Workout ' + this.getActiveItem()._workoutName);
    },
    refreshActiveItem: function () {
        this.getActiveItem().refresh();
    },
    toggleWarmup: function () {
        var warmupOn = false;
        if (this.warmupButton.getUi() === 'confirm') {
            this.warmupButton.setUi('decline');
            this.workoutA.setItemCls('');
            this.workoutB.setItemCls('');
            warmupOn = false;
        }
        else {
            this.workoutA.setItemCls('workout-item collapsed');
            this.workoutB.setItemCls('workout-item collapsed');
            this.warmupButton.setUi('confirm');
            warmupOn = true;
        }
        biglifts.stores.ss.WorkoutStore.filter('warmup', warmupOn);

    },
    bindListeners: function () {
        this.addListener('activeitemchange', this.setToolbarTitle, this);
        biglifts.stores.ss.Lifts.addListener('beforesync', this.refreshActiveItem, this);
        biglifts.stores.GlobalSettings.addListener('beforesync', this.refreshActiveItem, this);
    },
    destroyListeners: function () {
        this.removeListener('activeitemchange', this.setToolbarTitle, this);
        biglifts.stores.ss.Lifts.removeListener('beforesync', this.refreshActiveItem, this);
        biglifts.stores.GlobalSettings.removeListener('beforesync', this.refreshActiveItem, this);
    },
    config: {
        cls: 'ss-workout',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                items: [
                    {xtype: 'spacer'},
                    {
                        itemId: 'rest-timer-button',
                        cls: 'rest-timer-button',
                        iconCls: 'clock',
                        iconMask: true,
                        ui: 'decline'
                    },
                    {
                        itemId: 'done-button',
                        style: 'z-index: 11',
                        iconCls: 'done',
                        iconMask: true,
                        ui: 'action'
                    }
                ]
            }
        ],
        listeners: {
            activeitemchange: function () {
                var tabText = this.getActiveItem().tab.getText();
                biglifts.stores.ss.WorkoutStore.filter('name', tabText);
            },
            initialize: function () {
                var me = this;
                me.workoutToolbar = me.down('.toolbar');

                me.down('#rest-timer-button').setHandler(Ext.bind(me.showRestTimer, me));
                me.down('#done-button').setHandler(Ext.bind(me.markWorkoutCompleted, me));

                biglifts.stores.ss.WorkoutStore.filter('name', 'A');
                var listConfigA = {
                    title: 'A',
                    xtype: 'list',
                    store: biglifts.stores.ss.WorkoutStore,
                    itemCls: 'workout-item collapsed',
                    itemTpl: new Ext.XTemplate(
                        '<table class="ss-workout {[values.warmup ? "warmup" : ""]}"><tbody><tr>' +
                            '<td class="name" width="50%">{[this.getLiftName(values.lift_id)]}</td>' +
                            '<td width="25%"><span class="sets">{sets}x </span>{reps}</td>' +
                            '<td class="last" width="25%">{[this.getWeight(values.lift_id)]}{[this.getUnits()]}</td>' +
                            '</tr></tbody></table>', {
                            getLiftName: function (lift_id) {
                                return biglifts.stores.ss.Lifts.findRecord('id', lift_id).get('name');
                            },
                            getWeight: function (lift_id) {
                                return biglifts.stores.ss.Lifts.findRecord('id', lift_id).get('weight');
                            },
                            getUnits: function () {
                                return biglifts.stores.GlobalSettings.getUnits();
                            }
                        })
                };

                var listConfigB = _.clone(listConfigA);
                listConfigB.title = 'B';

                this.workoutA = me.add(listConfigA);
                this.workoutA._workoutName = 'A';
                this.workoutB = me.add(listConfigB);
                this.workoutB._workoutName = 'B';

                me.setToolbarTitle();

                var toolbar = me.add({
                    xtype: 'toolbar',
                    docked: 'bottom',
                    cls: 'unstyled-toolbar'
                });

                this.warmupButton = toolbar.add({xtype: 'button', text: 'Warmup', ui: 'confirm', handler: Ext.bind(me.toggleWarmup, me)});
                toolbar.add({xtype: 'spacer'});
                toolbar.add(Ext.create('biglifts.components.SetCounter'));
                this.bindListeners();
            },
            destroy: function () {
                this.destroyListeners();
            }
        }
    }
});