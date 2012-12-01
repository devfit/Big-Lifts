Ext.define('biglifts.views.ss.EditLiftsForm', {
    extend: 'Ext.form.Panel',
    buildInputsFromStore: function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.ss.Lifts, function () {
            me.down('fieldset').removeAll(true, true);
            biglifts.stores.ss.Lifts.each(me.createInput, me);
        });
    },
    inputChanged: function (field, newVal) {
        var name = field.getName();
        var record = biglifts.stores.ss.Lifts.findRecord('id', name);
        record.set('weight', newVal);
        biglifts.stores.ss.Lifts.sync();
    },
    createInput: function (record) {
        this.down('fieldset').add({
            xtype: 'numberfield',
            name: record.get('id'),
            label: record.get('name'),
            value: record.get('weight'),
            listeners: {
                change: Ext.bind(this.inputChanged, this)
            }
        });
    },
    config: {
        items: [
            {
                xtype: 'fieldset',
                cls: 'fieldset-title-no-margin',
                title: 'Lifts'
            }
        ],
        listeners: {
            painted: function () {
                this.buildInputsFromStore();
            }
        }
    }
});