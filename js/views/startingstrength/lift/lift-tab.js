Ext.define('biglifts.views.ss.Lift', {
    extend:'Ext.Panel',
    config:{
        title:'Lift!',
        iconCls:'icnBarbell',
        layout:'card',
        listeners:{
            initialize:function () {
                this.add(Ext.create('biglifts.views.ss.Workouts'));
                this.setActiveItem(0);
            }
        }
    }
});