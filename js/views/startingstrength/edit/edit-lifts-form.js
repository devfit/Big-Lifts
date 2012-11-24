Ext.define('biglifts.views.ss.EditLiftsForm', {
    extend:'Ext.form.Panel',
    buildInputsFromStore:function () {
        var me = this;
        util.withLoadedStore(biglifts.stores.ss.Lifts, function () {
            biglifts.stores.ss.Lifts.each(me.createInput, me);
        });
    },
    createInput:function (record) {
        var liftName = record.data.name;

        this.down('fieldset').add({
            xtype:'numberfield',
            label:liftName,
            value:record.data.weight
        });
    },
    config:{
        items:[
            {
                xtype:'fieldset',
                cls:'fieldset-title-no-margin',
                title:'Lifts'
            }
        ],
        listeners:{
            initialize:function () {
                this.buildInputsFromStore();
            }
        }
    }
});