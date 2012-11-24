Ext.define('biglifts.views.ss.Workouts', {
    extend:'Ext.tab.Panel',
    config:{
        items:[
            {
                xtype:'toolbar',
                docked:'top',
                title:'Workout A'
            }
        ],
        listeners:{
            activeitemchange:function () {
                var tabText = this.getActiveItem().tab.getText();
                biglifts.stores.ss.WorkoutStore.filter('name', tabText);
            },
            initialize:function () {
                biglifts.stores.ss.WorkoutStore.filter('name', 'A');
                var listConfigA = {
                    title:'A',
                    xtype:'list',
                    store:biglifts.stores.ss.WorkoutStore,
                    itemTpl:new Ext.XTemplate('{[this.getLiftName(values.lift_id)]} {sets}x{reps}', {
                        getLiftName:function (lift_id) {
                            return biglifts.stores.ss.Lifts.findRecord('id', lift_id).get('name');
                        }
                    })
                };

                var listConfigB = _.clone(listConfigA);
                listConfigB.title = 'B';

                this.add(listConfigA);
                this.add(listConfigB);
            }
        }
    }
});