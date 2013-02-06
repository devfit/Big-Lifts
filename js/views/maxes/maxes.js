"use strict";
Ext.define('biglifts.views.Maxes', {
    extend:'Ext.Panel',
    config:{
        id:'maxes-panel',
        title:'Edit',
        iconCls:'settings',
        layout:'card',
        listeners:{
            initialize:function () {
                this.add([
                    Ext.create("Biglifts.views.MaxesForm"),
                    biglifts.maxes.cards.editMaxesList,
                    biglifts.maxes.cards.editLiftPanel,
                    Ext.create('biglifts.views.AddLiftPanel'),
                    Ext.create('biglifts.views.ArrangeLifts'),
                    Ext.create('biglifts.views.BarSetup', {
                        id:'bar-plates',
                        backFunction:function () {
                            Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
                        }
                    }),
                    Ext.create('biglifts.views.PowerliftingTotalEditor', {id:'powerliftingtotaleditor'})
                ]);
                this.setActiveItem(0);
            }
        }
    }
});