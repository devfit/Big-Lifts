Ext.define('biglifts.views.SimplestStrengthTemplateMaxes', {
    extend:"Ext.form.Panel",
    goBack:function () {
        this.liftsFieldset.getItems().each(function (f) {
            var id = f.getName();
            var value = f.getValue();
            var lift = biglifts.stores.assistance.SST.findRecord('id', id);
            lift.set('max', value);
        });
        biglifts.stores.assistance.SST.sync();

        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('sst'));
    },
    setupFieldset:function () {
        var me = this;
        me.liftsFieldset.removeAll();
        biglifts.stores.assistance.SST.each(function (l) {
            me.liftsFieldset.add({
                xtype:'numberfield',
                label:l.get('name'),
                labelWidth:'66%',
                name:l.get('id'),
                value:l.get('max')
            });
        });
    },
    initialize:function () {
        this.add({
            xtype:'toolbar',
            docked:'top',
            title:'Maxes',
            items:[
                {
                    xtype:'button',
                    text:"Back",
                    ui:'back',
                    handler:Ext.bind(this.goBack, this)
                }
            ]
        });

        this.liftsFieldset = this.add({
            xtype:'fieldset',
            cls:'fieldset-title-no-margin'
        });
    },
    config:{
        id:'sst-maxes',
        listeners:{
            painted:function () {
                this.setupFieldset();
            }
        }
    }
});