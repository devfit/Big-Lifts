Ext.define('biglifts.views.ss.WorkoutBreakdown', {
    extend: 'Ext.Panel',
    back: function () {
        var currentIndex = _.indexOf(this.workouts, this.currentWorkout);
        if (currentIndex > 0) {
            this.currentWorkout = this.workouts[currentIndex - 1];
            this.setupView();
        }
        else {
            Ext.getCmp('ss-lift-tab').setActiveItem(Ext.getCmp('ss-workout'));
        }
    },
    next: function () {
        var currentIndex = _.indexOf(this.workouts, this.currentWorkout);
        this.currentWorkout = this.workouts[currentIndex + 1];
        this.setupView();
    },
    startWorkout: function (workouts) {
        this.workouts = workouts;
        this.currentWorkout = workouts[0];
        Ext.getCmp('ss-lift-tab').setActiveItem(this);
    },
    setupView: function () {
        this.updateList();
        this.updateTitle();
        this.updateNextSaveButtons();
    },
    updateList: function () {
        biglifts.stores.ss.WorkoutStore.clearFilter(true);
        biglifts.stores.ss.WorkoutStore.filter('name', this.currentWorkout.get('name'));
        biglifts.stores.ss.WorkoutStore.filter('lift_id', this.currentWorkout.get('lift_id'));
        this.workoutList.refresh();
    },
    updateTitle: function () {
        var name = biglifts.stores.ss.Lifts.findRecord('id', this.currentWorkout.get('lift_id')).get('name');
        this.toolbar.setTitle(name);
    },
    updateNextSaveButtons: function () {
        var index = _.indexOf(this.workouts, this.currentWorkout);
        if (index == this.workouts.length - 1) {
            this.saveButton.show();
            this.nextButton.hide();
        }
        else {
            this.saveButton.hide();
            this.nextButton.show();
        }
    },
    save: function () {
        var me = this;
        var newWorkoutId = biglifts.stores.ss.Log.getNewWorkoutId();
        util.withNoFilters(biglifts.stores.ss.WorkoutStore, function () {
            biglifts.stores.ss.WorkoutStore.filter('warmup', false);
            biglifts.stores.ss.WorkoutStore.filter('name', me.currentWorkout.get('name'));
            biglifts.stores.ss.WorkoutStore.each(function (w) {
                var lift = biglifts.stores.ss.Lifts.findRecord('id', w.get('lift_id'));

                biglifts.stores.ss.Log.add({name: lift.get("name"), weight: lift.get('weight'), sets: w.get('sets'),
                    reps: w.get('reps'), units: biglifts.stores.GlobalSettings.getUnits(), timestamp: new Date().getTime(),
                    workout_id: newWorkoutId});

                lift.set('weight', lift.get('weight') + lift.get('increase'));
            });
            biglifts.stores.ss.WorkoutStore.clearFilter();
        });

        biglifts.stores.ss.Log.sync();
        biglifts.stores.ss.Lifts.sync();
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('ss-track-tab'));
        Ext.getCmp('ss-lift-tab').setActiveItem(Ext.getCmp('ss-workout'));
    },
    config: {
        id: 'ss-workout-breakdown',
        layout: 'fit',
        listeners: {
            initialize: function () {
                this.toolbar = this.add({xtype: 'toolbar', docked: 'top'});
                this.toolbar.add({xtype: 'button', ui: 'back', text: 'Back', handler: Ext.bind(this.back, this)});
                this.toolbar.add({xtype: 'spacer'});
                this.nextButton = this.toolbar.add({xtype: 'button', ui: 'forward', text: 'Next', handler: Ext.bind(this.next, this)});
                this.saveButton = this.toolbar.add({xtype: 'button', ui: 'confirm', text: 'Save', handler: Ext.bind(this.save, this), hidden: true});

                this.workoutList = this.add(Ext.create('biglifts.views.ss.WorkoutList'));
            },
            painted: function () {
                this.setupView();
            }
        }
    }
});