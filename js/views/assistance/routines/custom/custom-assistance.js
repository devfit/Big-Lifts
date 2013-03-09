Ext.define("Biglifts.views.Custom", {
    extend: "Ext.Panel",
    showArrange: function () {
        if (this.customPanelArrange != this.getActiveItem()) {
            this.setActiveItem(this.customPanelArrange);
        }
    },
    showCustomMovement: function () {
        if (this.customPanel != this.getActiveItem()) {
            this.setActiveItem(this.customPanel);
        }
    },
    config: {
        cls: 'assistance',
        layout: 'card',
        customPanelClass: 'biglifts.views.CustomPanel',
        listeners: {
            initialize: function () {
                var me = this;
                var config = {
                    customMovementStore: me.customMovementStore,
                    movementEditor: me.movementEditor,
                    assistanceType: me.assistanceType,
                    listConfig: me.listConfig,
                    filterCustomMovements: me.filterCustomMovements,
                    supportsAdd: me.supportsAdd,
                    supportsArrange: me.supportsArrange
                };
                me.customPanel = me.add(Ext.create(me.getCustomPanelClass(), config));
                me.customPanelArrange = me.add(Ext.create('biglifts.views.CustomMovementArrangePanel', config));
                me.setActiveItem(me.customPanel);
            }
        }
    }
});