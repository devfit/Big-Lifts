Ext.define('biglifts.views.ss.Edit', {
    extend:'Ext.Panel',
    config:{
        title:'Edit',
        iconCls:'settings',
        layout:'card',
        cls:'start-page',
        listeners:{
            initialize:function () {
                this.add(Ext.create('biglifts.views.ss.EditLiftsForm'));
                this.setActiveItem(0);
            }
        }
    }
});