Ext.define('biglifts.views.ss.Workouts', {
    extend:'Ext.tab.Panel',
    showRestTimer:function () {
        var parent = this.getParent();
        parent.setActiveItem(parent.restTimer);
    },
    showConfig:function () {
        Ext.getCmp('ss-lift-tab').setActiveItem(Ext.getCmp('ss-config'));
    },
    markWorkoutCompleted:function () {
        var me = this;
        var newWorkoutId = biglifts.stores.ss.Log.getNewWorkoutId();
        util.withNoFilters(biglifts.stores.ss.WorkoutStore, function () {
            biglifts.stores.ss.WorkoutStore.filter('warmup', false);
            biglifts.stores.ss.WorkoutStore.filter('name', me.workoutName);
            biglifts.stores.ss.WorkoutStore.each(function (w) {
                var lift = biglifts.stores.ss.Lifts.findRecord('id', w.get('lift_id'));

                biglifts.stores.ss.Log.add({
                    name:lift.get("name"),
                    weight:lift.get('weight'),
                    sets:w.get('sets'),
                    reps:w.get('reps'),
                    units:'lbs',
                    timestamp:new Date().getTime(),
                    workout_id:newWorkoutId
                });

                lift.set('weight', lift.get('weight') + lift.get('increase'));
            });
            biglifts.stores.ss.WorkoutStore.clearFilter();
        });

        biglifts.stores.ss.Log.sync();
        biglifts.stores.ss.Lifts.sync();
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('ss-track-tab'));
    },
    setToolbarTitle:function () {
        this.workoutToolbar.setTitle('Workout ' + this.getActiveItem()._workoutName);
    },
    refreshActiveItem:function () {
        this.getActiveItem().refresh();
    },
    toggleWarmup:function () {
        if (this.warmupButton.getUi() === 'confirm') {
            this.warmupButton.setUi('decline');
            this.workoutA.setItemCls('workout-item');
            this.workoutB.setItemCls('workout-item');

            biglifts.stores.ss.WorkoutStore.filter('warmup', false);
        }
        else {
            this.workoutA.setItemCls('workout-item collapsed');
            this.workoutB.setItemCls('workout-item collapsed');
            this.warmupButton.setUi('confirm');

            biglifts.stores.ss.WorkoutStore.clearFilter(true);
            biglifts.stores.ss.WorkoutStore.filter('name', this.workoutName);
        }
    },
    bindListeners:function () {
        this.addListener('activeitemchange', this.setToolbarTitle, this);
        biglifts.stores.ss.Lifts.addListener('beforesync', this.refreshActiveItem, this);
        biglifts.stores.GlobalSettings.addListener('beforesync', this.refreshActiveItem, this);
    },
    destroyListeners:function () {
        this.removeListener('activeitemchange', this.setToolbarTitle, this);
        biglifts.stores.ss.Lifts.removeListener('beforesync', this.refreshActiveItem, this);
        biglifts.stores.GlobalSettings.removeListener('beforesync', this.refreshActiveItem, this);
    },
    config:{
        id:'ss-workout',
        cls:'ss-workout',
        listeners:{
            activeitemchange:function () {
                this.workoutName = this.getActiveItem().tab.getText();
                biglifts.stores.ss.WorkoutStore.filter('name', this.workoutName);
            },
            initialize:function () {
                var me = this;
                me.workoutToolbar = me.add({
                    xtype:'toolbar',
                    docked:'top'
                });

                me.workoutToolbar.add({
                    iconCls:'settings',
                    iconMask:true,
                    ui:'action',
                    handler:Ext.bind(this.showConfig, this)
                });

                me.workoutToolbar.add({xtype:'spacer'});

                me.workoutToolbar.add({
                    cls:'rest-timer-button',
                    iconCls:'clock',
                    iconMask:true,
                    ui:'decline',
                    handler:Ext.bind(me.showRestTimer, me)
                });

                me.workoutToolbar.add({
                    style:'z-index: 11',
                    iconCls:'done',
                    iconMask:true,
                    ui:'action',
                    handler:Ext.bind(me.markWorkoutCompleted, me)
                });

                this.workoutName = 'A';
                biglifts.stores.ss.WorkoutStore.filter('name', this.workoutName);
                var listConfigA = {
                    title:'A',
                    xtype:'list',
                    store:biglifts.stores.ss.WorkoutStore,
                    itemCls:'workout-item collapsed',
                    itemTpl:new Ext.XTemplate(
                        '<table class="ss-workout {[values.warmup ? "warmup" : ""]}"><tbody><tr>' +
                            '<td class="name" width="50%">{[this.getLiftName(values.lift_id)]}</td>' +
                            '<td width="25%"><span class="sets">{sets}x </span>{reps}</td>' +
                            '<td class="last" width="25%">{[this.getWeight(values.lift_id, values.percentage)]}{[this.getUnits()]}</td>' +
                            '</tr></tbody></table>', {
                            getLiftName:function (lift_id) {
                                return biglifts.stores.ss.Lifts.findRecord('id', lift_id).get('name');
                            },
                            getWeight:function (lift_id, percentage) {
                                var weight = biglifts.stores.ss.Lifts.findRecord('id', lift_id).get('weight');
                                if (percentage === 0) {
                                    return biglifts.stores.BarWeight.first().get('weight');
                                }
                                else {
                                    return biglifts.weight.format(weight, percentage);
                                }
                            },
                            getUnits:function () {
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
                    xtype:'toolbar',
                    docked:'bottom',
                    cls:'unstyled-toolbar'
                });

                this.warmupButton = toolbar.add({xtype:'button', text:'Warmup', ui:'confirm', handler:Ext.bind(me.toggleWarmup, me)});
                toolbar.add({xtype:'spacer'});
                toolbar.add(Ext.create('biglifts.components.SetCounter'));
                this.bindListeners();
            },
            destroy:function () {
                this.destroyListeners();
            }
        }
    }
});