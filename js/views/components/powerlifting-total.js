Ext.define("biglifts.components.PowerliftingTotal", {
    extend:"Ext.Container",
    bindListeners:function () {
        biglifts.stores.lifts.Lifts.addListener('beforesync', this.updatePowerliftingTotal, this);
        biglifts.stores.LiftLog.addListener('beforesync', this.updatePowerliftingTotal, this);
        biglifts.stores.PowerliftingTotalLifts.addListener('beforesync', this.updatePowerliftingTotal, this);
    },
    destroyListeners:function () {
        biglifts.stores.lifts.Lifts.removeListener('beforesync', this.updatePowerliftingTotal, this);
        biglifts.stores.LiftLog.removeListener('beforesync', this.updatePowerliftingTotal, this);
    },
    updatePowerliftingTotal:function () {
        var me = this;
        util.powerliftingTotal.getTotal(function (total) {
            me.powerliftingTotal.show();
            me.powerliftingTotal.setData({total:total});
        });
    },
    constructor:function () {
        this.callParent(arguments);

        this.add({xtype:'spacer', flex:1});
        this.add(Ext.create('biglifts.components.ConfigGear', {
            tapAction:function () {
                Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('powerliftingtotaleditor'));
            }
        }));
        this.powerliftingTotal = this.add({
            padding:'4 0 0 4',
            xtype:'component',
            tpl:'<b>Powerlifting Total:</b> {total}',
            cls:'powerlifting-total',
            data:{
                total:0
            }
        });
    },
    config:{
        layout:'hbox',
        pack:'end',
        listeners:{
            painted:function () {
                if (!this._painted) {
                    this._painted = true;
                    this.bindListeners();
                }
                this.updatePowerliftingTotal();
            },
            destroy:function () {
                this.destroyListeners();
            }
        }
    }
})
;