"use strict";
Ext.define('biglifts.views.More', {
    extend:'Ext.Panel',
    config:{
        id:'more',
        title:'More',
        iconCls:'more',
        layout:'card',
        activeItem:0,
        items:[
            biglifts.views.MoreInfoList,
            biglifts.views.Settings
        ],
        listeners:{
            initialize:function () {
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

