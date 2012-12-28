Ext.define("biglifts.views.BoringButBig", {
    extend: "Ext.Panel",
    showCustomMovement: function () {
        this.setActiveItem(0);
    },
    showArrange: function () {
        this.setActiveItem(1);
    },
    config: {
        id: 'boring-but-big',
        layout: 'card',
        listeners: {
            initialize: function () {
                var me = this;
                this.bbbPanel = this.add(Ext.create('biglifts.views.BoringButBigPanel'));
                this.arrangePanel = me.add(Ext.create('biglifts.views.CustomMovementArrangePanel', {
                    customMovementStore: biglifts.stores.assistance.BoringButBig
                }));
                this.setActiveItem(0);
            }
        }
    }
});