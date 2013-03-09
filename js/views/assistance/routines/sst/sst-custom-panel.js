Ext.define("biglifts.views.SstCustomPanel", {
    extend:"biglifts.views.CustomPanel",
    filterCustomMovements:function () {
        var startingWeek = this.findLastCompletedWeek(Ext.getCmp('assistance-lift-chooser').getCurrentLift());
        this.weekSelector.setValue(startingWeek);
        biglifts.stores.assistance.SSTSets.filter('week', startingWeek);
    },
    findLastCompletedWeek:function (lift) {
        var highestCompleted = 1;

        util.withNoFilters(biglifts.stores.lifts.LiftCompletion, function () {
            biglifts.stores.lifts.LiftCompletion.filter('liftPropertyName', lift.get('propertyName'));
            biglifts.stores.lifts.LiftCompletion.each(function (l) {
                if (l.get('completed') && l.get('week') > highestCompleted) {
                    highestCompleted = l.get('week');
                }
            });
            biglifts.stores.lifts.LiftCompletion.clearFilter();
        });

        return highestCompleted;
    },
    weekChanged:function () {
        var week = this.weekSelector.getValue();
        biglifts.stores.assistance.SSTSets.filter('week', week);
    },
    showSstMaxes:function () {
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('sst-maxes'));
    },
    logMovements:function () {
        var me = this;

        var lift_id = Ext.getCmp('assistance-lift-chooser').getCurrentLift().get('id');
        var ssLift = biglifts.stores.assistance.SST.findRecord('lift_id', lift_id);

        this.getCustomMovementStore().each(function (record) {
            var percentage = record.get('percentage');
            var weight = biglifts.weight.format(ssLift.get('max'), percentage);
            var assistanceRecord = {
                movement:ssLift.get('name'),
                assistanceType:me.getAssistanceType(),
                sets:1,
                reps:record.get('reps'),
                weight:weight,
                timestamp:new Date().getTime(),
                cycle:biglifts.stores.CurrentCycle.getCurrentCycle()
            };

            biglifts.stores.assistance.ActivityLog.add(assistanceRecord);
        });

        biglifts.stores.assistance.ActivityLog.sync();
        Ext.getCmp('assistance').setActiveItem(0);
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
    },
    supportsAdd:false,
    supportsArrange:false,
    initialize:function () {
        this.callParent(arguments);
        this.sstToolbar = this.add({
            ui:'light',
            xtype:'toolbar',
            docked:'top'
        });

        this.sstToolbar.add({xtype:'button', text:'Maxes', handler:this.showSstMaxes});
        this.sstToolbar.add({xtype:'spacer'});
        this.weekSelector = this.sstToolbar.add({
            name:'week',
            xtype:'selectfield',
            label:'Week',
            displayField:'value',
            valueField:'value',
            options:[
                {value:1},
                {value:2},
                {value:3},
                {value:4}
            ],
            listeners:{
                change:Ext.bind(this.weekChanged, this)
            }
        });
    },
    listeners:{
        painted:function () {
            biglifts.stores.assistance.SST.addListener('beforesync', this.movementList.refresh, this.movementList);
        },
        destroy:function () {
            biglifts.stores.assistance.SST.removeListener('beforesync', this.movementList.refresh, this.movementList);
        }
    }
});