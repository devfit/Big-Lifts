"use strict";
Ext.ns('biglifts.views', 'biglifts.stores', 'biglifts.maxes.controller');

Ext.define('biglifts.views.Maxes', {
    extend:'Ext.Panel',
    config:{
        id:'maxes-panel',
        title:'Edit',
        iconCls:'settings',
        layout:'card',
        listeners:{
            initialize:function(){
                this.add(biglifts.maxes.cards.maxesForm);
                this.setActiveItem(0);
            },
            painted:function () {
                if (!this._painted) {
                    this._painted = true;
                    this.add([
                        biglifts.maxes.cards.editMaxesList,
                        biglifts.maxes.cards.editLiftPanel,
                        biglifts.maxes.cards.addLiftPanel,
                        biglifts.maxes.cards.ArrangeLifts,
                        biglifts.maxes.barSetup.BarSetup
                    ]);
                }
            }
        }
    }
});