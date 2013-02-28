Ext.define('biglifts.views.templates.Custom', {
    extend: 'biglifts.views.templates.Base',
    showEditLiftPercentages: function () {
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('edit-lift-percentages'));
    },
    constructor: function () {
        this.callParent(arguments);

        var me = this;
        this.add({
            xtype: 'toolbar',
            docked: 'top',
            title: "Custom",
            items: [
                {
                    text: 'Back',
                    ui: 'back',
                    handler: Ext.bind(me.carouselBack, me)
                }
            ]
        });

        this.add({
            xtype: 'toolbar',
            docked: 'top',
            ui: 'light',
            items: [
                {xtype: 'spacer'},
                {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Use',
                    handler: Ext.bind(me.showEditLiftPercentages, me)
                }
            ]
        });

        this.add({
            html: 'Setup sets, reps, and percentages manually',
            margin: "0 0 5 0"
        });
    }
});