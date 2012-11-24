Ext.define('biglifts.views.ss.Lift', {
    extend:'Ext.Panel',
    config:{
        title:'Lift!',
        iconCls:'icnBarbell',
        layout:'card',
        listeners:{
            initialize:function () {
                this.add({html:'hello!'});
                this.setActiveItem(0);
            }
        }
    }
});