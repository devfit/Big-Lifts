Ext.define('biglifts.views.LiftSettings', {
    extend: 'Ext.Panel',
    returnToLiftSelectFromSettings: function () {
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('lift-selector'));
    },
    config: {
        id: 'lift-settings',
        layout: 'card',
        activeItem: 0,
        listeners: {
            painted: function () {
                biglifts.navigation.setBackFunction(this.returnToLiftSelectFromSettings);
            },
            initialize: function () {
                this.add(Ext.create('biglifts.views.templates.Fresher'));
                this.add(Ext.create('biglifts.views.templates.Heavier'));
                this.add(Ext.create('biglifts.views.templates.Powerlifting'));
                this.add(Ext.create('biglifts.views.templates.Rotating'));
                this.add(Ext.create('biglifts.views.templates.Custom'));
            }
        },
        defaults: {
            xtype: 'formpanel',
            scroll: 'vertical'
        }
    }
});