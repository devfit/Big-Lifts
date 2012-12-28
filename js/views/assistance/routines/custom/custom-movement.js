Ext.define("Biglifts.views.Custom", {
    extend: "Ext.Panel",
    movementEditor: null,
    assistanceType: '',
    customMovementStore: null,
    showArrange: function () {
        this.setActiveItem(1);
    },
    showCustomMovement: function () {
        this.setActiveItem(0);
    },
    config: {
        cls: 'assistance',
        layout: 'card',
        listeners: {
            initialize: function () {
                var me = this;
                var config = {
                    customMovementStore: me.customMovementStore,
                    movementEditor: me.movementEditor,
                    assistanceType: me.assistanceType
                };
                me.add(Ext.create('biglifts.views.CustomPanel', config));
                me.add(Ext.create('biglifts.views.CustomMovementArrangePanel', config));
                me.setActiveItem(0);
            }
        }
    }
});