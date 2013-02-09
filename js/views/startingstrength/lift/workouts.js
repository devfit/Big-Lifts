Ext.define('biglifts.views.ss.Workouts', {
    extend:'Ext.Panel',
    showRestTimer:function () {
        var parent = this.getParent();
        parent.setActiveItem(parent.restTimer);
    },
    showConfig:function () {
        Ext.getCmp('ss-lift-tab').setActiveItem(Ext.getCmp('ss-config'));
        Ext.getCmp('ss-config').setActiveItem(0);
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
        this.workoutToolbar.setTitle("Workout " + this.workoutPanel.getActiveItem().getWorkoutName());
    },
    activeItemChanged:function () {
        this.workoutName = this.workoutPanel.getActiveItem().getWorkoutName();
        biglifts.stores.ss.WorkoutStore.filter('name', this.workoutName);
        this.setToolbarTitle();
    },
    refreshActiveItem:function () {
        this.workoutPanel.getActiveItem().refresh();
    },
    toggleWarmup:function () {
        if (this.warmupButton.getUi() === 'confirm') {
            this.warmupButton.setUi('decline');
            biglifts.stores.ss.WorkoutStore.filter('warmup', false);
        }
        else {
            this.warmupButton.setUi('confirm');
            biglifts.stores.ss.WorkoutStore.clearFilter(true);
            biglifts.stores.ss.WorkoutStore.filter('name', this.workoutName);
        }
    },
    bindListeners:function () {
        this.workoutPanel.addListener('activeitemchange', this.activeItemChanged, this);
        biglifts.stores.ss.Lifts.addListener('beforesync', this.refreshActiveItem, this);
        biglifts.stores.GlobalSettings.addListener('beforesync', this.refreshActiveItem, this);
    },
    destroyListeners:function () {
        this.removeListener('activeitemchange', this.activeItemChanged, this);
        biglifts.stores.ss.Lifts.removeListener('beforesync', this.refreshActiveItem, this);
        biglifts.stores.GlobalSettings.removeListener('beforesync', this.refreshActiveItem, this);
    },
    config:{
        id:'ss-workout',
        cls:'ss-workout',
        layout:'fit',
        listeners:{
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

                this.workoutPanel = Ext.create('Ext.tab.Panel');
                this.workoutPanel.add(Ext.create('biglifts.views.ss.WorkoutList', {workoutName:'A', title:'A'}));
                this.workoutPanel.add(Ext.create('biglifts.views.ss.WorkoutList', {workoutName:'B', title:'B'}));
                this.add(this.workoutPanel);

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