Ext.define('biglifts.views.Reset', {
    extend: 'Ext.form.Panel',
    hardReset: function () {
        Ext.Msg.confirm('WARNING', 'Reset ALL data and settings?', function (text) {
            if (text === 'yes') {
                util.filebackup.deleteStoreFiles(util.filebackup.watchedStores, function () {
                    localStorage.clear();
                    location.href = "index.html";
                });
            }
        });
    },
    resetCheckedStores: function () {
        var stores = [];
        _.each(this.getValues(), function (value, storeId) {
            if (value) {
                stores.push(Ext.getStore(storeId));
            }
        });

        _.each(stores, function (store) {
            store.removeAll();
            store.clearListeners('beforesync');
            store.sync();
        });

        util.filebackup.deleteStoreFiles(stores, function () {
            location.href = "index.html";
        });
    },
    config: {
        backFunction: null,
        padding: 0,
        listeners: {
            initialize: function () {
                var me = this;
                me.add({
                    xtype: 'toolbar',
                    title: 'Reset',
                    items: [
                        {
                            xtype: 'button',
                            ui: 'back',
                            text: 'Back',
                            handler: me.getBackFunction()
                        }
                    ]
                });

                me.add({
                    xtype: 'container',
                    padding: 5,
                    items: [
                        {
                            xtype: 'button',
                            text: 'Reset All',
                            ui: 'decline',
                            handler: me.hardReset
                        }
                    ]
                });

                var fieldset = me.add({
                    xtype: 'fieldset',
                    cls: 'fieldset-title-no-margin',
                    style: 'margin-bottom: 0',
                    title: "Data",
                    defaults: {
                        labelWidth: '70%',
                        value: false
                    }
                });

                fieldset.add({
                    xtype: 'checkboxfield',
                    label: 'Lift Checkmarks',
                    name: 'liftCompletions'
                });

                if (biglifts.toggles.Assistance) {
                    fieldset.add({
                        xtype: 'checkboxfield',
                        label: 'Custom Asst.',
                        name: 'triumvirate'
                    });
                }

                me.add({
                    xtype: 'container',
                    padding: 5,
                    items: [
                        {
                            xtype: 'button',
                            text: 'Reset',
                            ui: 'decline',
                            handler: Ext.bind(me.resetCheckedStores, me)
                        }
                    ]
                });
            }
        }
    }
});