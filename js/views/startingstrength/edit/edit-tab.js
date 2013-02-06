Ext.define('biglifts.views.ss.Edit', {
    extend:'Ext.Panel',
    showEditLifts:function () {
        this.setActiveItem(0);
    },
    showEditIndividualLift:function () {
        this.setActiveItem(1);
    },
    showBarSetup: function(){
        this.setActiveItem(2);
    },
    config:{
        id:'ss-edit',
        title:'Edit',
        iconCls:'settings',
        layout:'card',
        cls:'start-page',
        listeners:{
            painted:function () {
                biglifts.navigation.unbindBackEvent();
            },
            initialize:function () {
                var me = this;
                this.add(Ext.create('biglifts.views.ss.EditLiftsForm'));
                this.add(Ext.create('biglifts.views.ss.EditLift'));
                this.add(Ext.create('biglifts.views.BarSetup', {
                    backFunction:Ext.bind(me.showEditLifts, me)
                }));
                this.setActiveItem(0);
            }
        }
    }
})
;