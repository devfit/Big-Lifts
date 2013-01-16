Ext.define("biglifts.views.SstCustomPanel", {
    extend:"biglifts.views.CustomPanel",
    filterCustomMovements:function () {
        biglifts.stores.assistance.SSTSets.filter('week', 1);
    },
    weekChanged:function () {
        var week = this.weekSelector.getValue();
        biglifts.stores.assistance.SSTSets.filter('week', week);
    },
    supportsAdd:false,
    supportsArrange:false,
    initialize:function () {
        this.callParent(arguments);
        this.weekSelectorToolbar = this.add({
            xtype:'toolbar',
            docked:'top',
            items:[
                {xtype:'spacer'}
            ]
        });

        this.weekSelector = this.weekSelectorToolbar.add({
            name:'week',
            xtype:'selectfield',
            label:'Week',
            displayField:'value',
            valueField:'value',
            options:[
                {value:1},
                {value:2},
                {value:3},
                {value:4}
            ],
            listeners:{
                change:Ext.bind(this.weekChanged, this)
            }
        });
    }
});