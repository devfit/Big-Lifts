Ext.define("biglifts.views.PowerliftingTotalEditor", {
    extend:"Ext.form.Panel",
    rebuildLiftsFieldset:function () {
        var me = this;
        me.liftsFieldset.removeAll(true);
        util.withNoFilters(biglifts.stores.lifts.Lifts, function () {
            biglifts.stores.lifts.Lifts.each(function (l) {
                me.liftsFieldset.add({
                    xtype:'checkboxfield',
                    name:l.get('id'),
                    label:l.get('name'),
                    labelWidth:'66%',
                    checked: true
                });
            });
        })
    },
    constructor:function () {
        this.callParent(arguments);
        this.add({
            xtype:'toolbar',
            title:"Total",
            docked:'top',
            items:[
                {
                    xtype:'button',
                    ui:'back',
                    text:'Back'
                }
            ]
        });

        this.liftsFieldset = this.add({
            xtype:'fieldset',
            title:'Lifts',
            cls:'fieldset-title-no-margin'
        });
    },
    config: {
        listeners:{
            painted:function () {
                this.rebuildLiftsFieldset();
            }
        }
    }
});