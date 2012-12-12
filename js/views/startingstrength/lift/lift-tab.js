Ext.define('biglifts.views.ss.Lift', {
    extend: 'Ext.Panel',
    config: {
        title: 'Lift!',
        iconCls: 'icnBarbell',
        layout: 'card',
        listeners: {
            painted: function () {
                biglifts.navigation.unbindBackEvent();
            },
            initialize: function () {
                var me = this;
                me.workoutView = this.add(Ext.create('biglifts.views.ss.Workouts'));
                me.restTimer = this.add(Ext.create('biglifts.views.RestTimer', {
                    id: 'ss-rest-timer',
                    backFunction: function () {
                        me.setActiveItem(me.workoutView);
                    }
                }));
                this.setActiveItem(0);
            }
        }
    }
});