"use strict";

Ext.define('biglifts.views.AssistanceLiftChooser', {
    extend: 'Ext.Panel',
    showLiftChooser: function (assistanceId, title) {
        this.assistanceId = assistanceId;
        this._toolbar.setTitle(title);
        Ext.getCmp('assistance').setActiveItem(this);
        this.currentLiftProperty = null;
    },
    back: function () {
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
    },
    setCurrentLift: function(liftRecord){
      this.currentLiftProperty = liftRecord.get('propertyName');
    },
    liftSelected: function (list, index) {
        this.setCurrentLift(this._liftList.getStore().getAt(index));
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp(this.assistanceId));
    },
    config: {
        id: 'assistance-lift-chooser',
        layout: 'fit',
        listeners: {
            painted: function () {
                biglifts.stores.lifts.Lifts.clearFilter(true);
                biglifts.stores.lifts.Lifts.filter('enabled', true);
            },
            initialize: function () {
                var me = this;
                this._toolbar = this.add({
                    xtype: 'toolbar',
                    docked: 'top',
                    title: 'Assistance',
                    items: [
                        {
                            xtype: 'button',
                            ui: 'back',
                            text: 'Back',
                            handler: me.back
                        }
                    ]
                });

                this._liftList = this.add({
                    xtype: 'list',
                    store: biglifts.stores.lifts.Lifts,
                    itemTpl: '{name}',
                    onItemDisclosure: true,
                    listeners: {
                        itemtap: Ext.bind(me.liftSelected, me)
                    }
                });
            }
        }
    }
});