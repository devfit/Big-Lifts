Ext.define("biglifts.views.PowerliftingTotalEditor", {
    extend:"Ext.form.Panel",
    liftChecked:function (c) {
        this.includeLift(c.getName(), true);
    },
    liftUnchecked:function (c) {
        this.includeLift(c.getName(), false);
    },
    includeLift:function (lift_id, include) {
        biglifts.stores.PowerliftingTotalLifts.findRecord("lift_id", lift_id).set('included', include);
        biglifts.stores.PowerliftingTotalLifts.sync();
    },
    useEstimatesChecked:function (c) {
        biglifts.stores.PowerliftingTotalConfig.first().set('useEstimates', true);
        biglifts.stores.PowerliftingTotalConfig.sync();
    },
    useEstimatesUnchecked:function (c) {
        biglifts.stores.PowerliftingTotalConfig.first().set('useEstimates', false);
        biglifts.stores.PowerliftingTotalConfig.sync();
    },
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
                    checked:biglifts.stores.PowerliftingTotalLifts.findRecord('lift_id', l.get('id')).get('included'),
                    listeners:{
                        check:Ext.bind(me.liftChecked, me),
                        uncheck:Ext.bind(me.liftUnchecked, me)
                    }
                });
            });
        })
    },
    goBack:function () {
        Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
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
                    text:'Back',
                    handler:Ext.bind(this.goBack, this)
                }
            ]
        });

        this.liftsFieldset = this.add({
            xtype:'fieldset',
            title:'Lifts',
            cls:'fieldset-title-no-margin'
        });

        this.configFieldset = this.add({
            xtype:'fieldset'
        });

        var me = this;
        util.withLoadedStore(biglifts.stores.PowerliftingTotalConfig, function () {
            me.configFieldset.add({
                xtype:'checkboxfield',
                name:"useEstimates",
                label:"Use Estimates",
                labelWidth:'66%',
                checked:biglifts.stores.PowerliftingTotalConfig.first().get('useEstimates'),
                listeners:{
                    check:Ext.bind(me.useEstimatesChecked, me),
                    uncheck:Ext.bind(me.useEstimatesUnchecked, me)
                }
            });
        });
    },
    config:{
        listeners:{
            painted:function () {
                this.rebuildLiftsFieldset();
            }
        }
    }
});