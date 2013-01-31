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
        this.down('#configuration').removeAll();
        biglifts.stores.assistance.SST.each(function (l) {
            me.liftsFieldset.add({
                xtype:'numberfield',
                label:l.get('name'),
                labelWidth:'66%',
                name:l.get('id'),
                value:l.get('max')
            });

            me.createConfigGear(l);
        });
    },
    createConfigGear:function (r) {
        this.down('#configuration').add(Ext.create('biglifts.components.ConfigGear', {
            record:r,
            tapAction:function () {
                Ext.getCmp('sst-lift-form').showFor(r);
            }
        }));
    },
    initialize:function () {
        this.add({
            xtype:'toolbar',
            docked:'top',
            title:'SST Lifts',
            items:[
                {
                    xtype:'button',
                    text:"Back",
                    ui:'back',
                    handler:Ext.bind(this.goBack, this)
                }
            ]
        });

        var fieldsetContainer = this.add({
            xtype:'container',
            layout:'hbox',
            items:[
                {
                    flex:1,
                    itemId:'configuration',
                    cls:'config-fieldset',
                    xtype:'fieldset'
                }
            ]
        });

        this.liftsFieldset = fieldsetContainer.add({
            xtype:'fieldset',
            cls:'fieldset-title-no-margin',
            flex:6
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