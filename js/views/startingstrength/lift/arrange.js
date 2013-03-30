Ext.define('biglifts.views.ss.Arrange', {
    extend: "biglifts.components.ArrangePanel",
    arrangeListClass: 'biglifts.views.ss.ArrangeList',
    orderProperty: 'groupOrder',
    done: function () {
        var me = this;
        me.getCustomMovementStore().clearFilter();
        _.each(me.savedFilters, function (f) {
            me.getCustomMovementStore().filter(f);
        });

        Ext.getCmp('ss-lift-tab').setActiveItem(Ext.getCmp('ss-workout'));
    },
    config: {
        id: 'ss-workout-arrange',
        customMovementStore: biglifts.stores.ss.WorkoutStore,
        listeners: {
            painted: function () {
                this.savedFilters = _.clone(this.getCustomMovementStore().getFilters());
                this.getCustomMovementStore().filter('warmup', false);
            }
        }
    }
});