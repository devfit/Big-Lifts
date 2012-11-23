Ext.define('biglifts.views.ss.Edit', {
    extend:'Ext.Panel',
    config:{
        title:'Edit',
        iconCls:'settings',
        layout:'card',
        listeners:{
            initialize:function () {
                this.add({html:'hello!'});
                this.setActiveItem(0);
            }
        }
    }
});