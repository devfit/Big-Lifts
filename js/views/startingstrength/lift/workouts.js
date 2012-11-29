Ext.define('biglifts.views.ss.Workouts', {
    extend:'Ext.tab.Panel',
    showRestTimer:function () {

    },
    markWorkoutCompleted:function () {
        biglifts.stores.ss.WorkoutStore.each(function (w) {
            var lift = biglifts.stores.ss.Lifts.findRecord('id', w.get('lift_id'));
            biglifts.stores.ss.Log.add({
                name:lift.get("name"),
                weight:lift.get('weight'),
                sets:w.get('sets'),
                reps:w.get('reps'),
                units:'lbs',
                timestamp:new Date().getTime()
            });
        });
        biglifts.stores.ss.Log.sync();
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('ss-track-tab'));
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
                    itemTpl:new Ext.XTemplate(
                        '<table class="ss-workout"><tbody><tr>' +
                            '<td class="name" width="50%">{[this.getLiftName(values.lift_id)]}</td>' +
                            '<td width="25%"><span class="sets">{sets}x </span>{reps}</td>' +
                            '<td class="last" width="25%">{[this.getWeight(values.lift_id)]}{[this.getUnits()]}</td>' +
                            '</tr></tbody></table>', {
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