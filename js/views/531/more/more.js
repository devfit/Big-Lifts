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
                var me = this;
                this.moreInfoList = this.add(Ext.create('biglifts.views.531.MoreInfoList'));
                this.settingsPanel = this.add(biglifts.views.Settings);

                if (biglifts.toggles.Assistance) {
                    this.add(
                        Ext.create('biglifts.views.OneRepMaxCalculator', {
                            id:'one-rep-max-calculator',
                            backFunction:function () {
                                me.setActiveItem(me.moreInfoList);
                            }
                        })
                    );
                }

                this.setActiveItem(0);
            }
        }
    }
});

