Ext.define('biglifts.views.ss.Workouts', {
    extend: 'Ext.Panel',
    showConfig: function () {
        Ext.getCmp('ss-lift-tab').setActiveItem(Ext.getCmp('ss-config'));
        Ext.getCmp('ss-config').setActiveItem(0);
    },
    workoutChanged: function(s, newValue){
        biglifts.stores.ss.WorkoutStore.filter('name', newValue);
    },
    arrange: function () {
        Ext.getCmp('ss-lift-tab').setActiveItem(Ext.getCmp('ss-workout-arrange'));
    },
    startWorkout: function(){
        Ext.getCmp('ss-workout-breakdown').startWorkout(biglifts.stores.ss.WorkoutStore.getRange());
    },
    setupView: function () {
        biglifts.stores.ss.WorkoutStore.clearFilter(true);
        biglifts.stores.ss.WorkoutStore.filter('name', this.workoutSelector.getValue());
        biglifts.stores.ss.WorkoutStore.filter('warmup', false);
        this.workoutList.refresh();
    },
    config: {
        id: 'ss-workout',
        cls: 'ss-workout',
        layout: 'fit',
        listeners: {
            initialize: function () {
                var me = this;
                me.workoutToolbar = me.add({
                    xtype: 'toolbar',
                    docked: 'top',
                    title: 'Workout'
                });

                me.workoutToolbar.add({
                    iconCls: 'settings',
                    iconMask: true,
                    ui: 'action',
                    handler: Ext.bind(this.showConfig, this)
                });
                me.workoutToolbar.add({xtype: 'spacer'});
                me.workoutToolbar.add({xtype: 'button', ui: 'confirm', text: 'Start', handler: this.startWorkout});

                biglifts.stores.ss.WorkoutStore.filter('name', 'A');
                this.workoutList = this.add(Ext.create('biglifts.views.ss.WorkoutList'));

                var toolbar = me.add({
                    xtype: 'toolbar',
                    docked: 'top',
                    ui: 'light'
                });
                toolbar.add({xtype: 'button', text: 'Arrange', handler: Ext.bind(me.arrange, me)});
                toolbar.add({xtype: 'spacer'});
                this.workoutSelector = toolbar.add({
                    xtype: 'selectfield',
                    name: 'workout',
                    width: 160,
                    options: [
                        {text: 'A', value: 'A'},
                        {text: 'B', value: 'B'}
                    ],
                    listeners: {
                        change: Ext.bind(me.workoutChanged, me)
                    }
                });
            },
            painted: function () {
                this.setupView();
            }
        }
    }
});