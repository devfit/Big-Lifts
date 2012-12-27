Ext.define('biglifts.views.ss.Edit', {
    extend: 'Ext.Panel',
    showEditLifts: function () {
        this.setActiveItem(0);
    },
    showEditIndividualLift: function () {
        this.setActiveItem(1);
    },
    config: {
        id: 'ss-edit',
        title: 'Edit',
        iconCls: 'settings',
        layout: 'card',
        cls: 'start-page',
        listeners: {
            painted: function () {
                biglifts.navigation.unbindBackEvent();
            },
            initialize: function () {
                this.add(Ext.create('biglifts.views.ss.EditLiftsForm'));
                this.add(Ext.create('biglifts.views.ss.EditLift'));
                this.setActiveItem(0);
            }
        }
    }
});