"use strict";
Ext.define('biglifts.views.More', {
    extend:'Ext.Panel',
    config:{
        id:'more',
        title:'More',
        iconCls:'more',
        layout:'card',
        listeners:{
            painted:function () {
                this.add([
                    biglifts.views.MoreInfoList,
                    biglifts.views.Settings
                ]);
                this.setActiveItem(0);
                if (biglifts.toggles.Assistance) {
                    this.add(
                        Ext.create('biglifts.views.OneRepMaxCalculator', {
                            backFunction:function () {
                                Ext.getCmp('more').setActiveItem(Ext.getCmp('more-info-list-panel'));
                            }
                        })
                    );
                }
            }
        }
    }
});

