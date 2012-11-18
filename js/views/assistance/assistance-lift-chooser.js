"use strict";
Ext.ns('biglifts.assistance');

Ext.define('biglifts.views.AssistanceLiftChooser', {
    extend:'Ext.Panel',
    xtype:'assistanceliftchooser',
    showLiftChooser:function (assistanceId, title) {
        this.assistanceId = assistanceId;
        this._toolbar.setTitle(title);
        Ext.getCmp('assistance').setActiveItem(this);
        biglifts.assistance.currentLiftProperty = null;
    },
    back:function () {
        Ext.getCmp('assistance').setActiveItem('assistance-chooser');
    },
    liftSelected:function (list, index) {
        var lift = this._liftList.getStore().getAt(index);
        biglifts.assistance.currentLiftProperty = lift.get('propertyName');
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp(this.assistanceId));
    },
    config:{
        id:'assistance-lift-chooser',
        layout:'fit',
        listeners:{
            show:function () {
                biglifts.stores.lifts.Lifts.filter('enabled', true);
            },
            initialize:function () {
                var me = this;
                this._toolbar = this.add({
                    xtype:'toolbar',
                    docked:'top',
                    title:'Assistance',
                    items:[
                        {
                            xtype:'button',
                            ui:'back',
                            text:'Back',
                            handler:me.back
                        }
                    ]
                });

                this._liftList = this.add({
                    xtype:'list',
                    store:biglifts.stores.lifts.Lifts,
                    itemTpl:'{name}',
                    onItemDisclosure:true,
                    listeners:{
                        itemtap:Ext.bind(me.liftSelected, me)
                    }
                });
            }
        }
    }
});