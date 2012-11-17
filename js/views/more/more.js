"use strict";
Ext.define('biglifts.views.More', {
    extend:'Ext.Panel',
    config:{
        id:'more',
        title:'More',
        iconCls:'more',
        layout:'card',
        listeners:{
            initialize:function () {
                this.add([
                    biglifts.views.MoreInfoList,
                    biglifts.views.Settings
                ]);

                if (biglifts.toggles.Assistance) {
                    this.add(
                        Ext.create('biglifts.views.OneRepMaxCalculator', {
                            backFunction:function () {
                                Ext.getCmp('more').setActiveItem(Ext.getCmp('more-info-list-panel'));
                            }
                        })
                    );
                }

                this.setActiveItem(0);
            }
        }
    }
});

