Ext.define('biglifts.views.ss.EditLiftsForm', {
    extend: 'Ext.form.Panel',
    buildInputsFromStore: function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.ss.Lifts, function () {
            me.down('#lifts').removeAll(true, true);
            me.down('#configuration').removeAll(true, true);
            biglifts.stores.ss.Lifts.each(me.createInput, me);
            biglifts.stores.ss.Lifts.each(me.createConfig, me);
        });
    },
    inputChanged: function (field, newVal) {
        var name = field.getName();
        var record = biglifts.stores.ss.Lifts.findRecord('id', name);
        record.set('weight', newVal);
        biglifts.stores.ss.Lifts.sync();
    },
    createInput: function (record) {
        this.down('#lifts').add({
            xtype: 'numberfield',
            name: record.get('id'),
            label: record.get('name'),
            value: record.get('weight'),
            labelWidth: "50%",
            listeners: {
                change: Ext.bind(this.inputChanged, this)
            }
        });
    },
    createConfig: function (record) {
        this.down('#configuration').add({
            xtype: 'label',
            cls: 'x-field config-field',
            html: 'C'
        });
    },
    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Edit'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        flex: 1,
                        itemId: 'configuration',
                        cls: 'config-fieldset',
                        xtype: 'fieldset'
                    },
                    {
                        flex: 4,
                        itemId: 'lifts',
                        xtype: 'fieldset',
                        cls: 'fieldset-title-no-margin',
                        title: 'Lifts'
                    }
                ]
            }
        ],
        listeners: {
            painted: function () {
                this.buildInputsFromStore();
            }
        }
    }
});