Ext.define('biglifts.views.ss.Workouts', {
    extend:'Ext.tab.Panel',
    showRestTimer:function () {

    },
    markWorkoutCompleted:function () {

    },
    config:{
        items:[
            {
                xtype:'toolbar',
                docked:'top',
                title:'Workout A',
                items:[
                    {xtype:'spacer'},
                    {
                        itemId:'rest-timer-button',
                        cls:'rest-timer-button',
                        iconCls:'clock',
                        iconMask:true,
                        ui:'decline'
                    },
                    {
                        itemId:'done-button',
                        style:'z-index: 11',
                        iconCls:'done',
                        iconMask:true,
                        ui:'action'
                    }
                ]
            }
        ],
        listeners:{
            activeitemchange:function () {
                var tabText = this.getActiveItem().tab.getText();
                biglifts.stores.ss.WorkoutStore.filter('name', tabText);
            },
            initialize:function () {
                this.down('#rest-timer-button').setHandler(Ext.bind(this.showRestTimer, this));
                this.down('#done-button').setHandler(Ext.bind(this.markWorkoutCompleted, this));

                biglifts.stores.ss.WorkoutStore.filter('name', 'A');
                var listConfigA = {
                    title:'A',
                    xtype:'list',
                    store:biglifts.stores.ss.WorkoutStore,
                    itemTpl:new Ext.XTemplate('{[this.getLiftName(values.lift_id)]} {sets}x{reps} ' +
                        '{[this.getWeight(values.lift_id)]}{[this.getUnits()]}', {
                        getLiftName:function (lift_id) {
                            return biglifts.stores.ss.Lifts.findRecord('id', lift_id).get('name');
                        },
                        getWeight:function (lift_id) {
                            return biglifts.stores.ss.Lifts.findRecord('id', lift_id).get('weight');
                        },
                        getUnits:function () {
                            return "lbs";
                        }
                    })
                };

                var listConfigB = _.clone(listConfigA);
                listConfigB.title = 'B';

                this.add(listConfigA);
                this.add(listConfigB);

                biglifts.stores.ss.Lifts.addListener('beforesync', function () {
                    this.getActiveItem().refresh();
                }, this);
            }
        }
    }
});