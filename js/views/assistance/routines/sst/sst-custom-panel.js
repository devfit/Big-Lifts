Ext.define("biglifts.views.SstCustomPanel", {
    extend:"biglifts.views.CustomPanel",
    filterCustomMovements:function () {
        biglifts.stores.assistance.SSTSets.filter('week', 1);
    },
    weekChanged:function () {
        var week = this.weekSelector.getValue();
        biglifts.stores.assistance.SSTSets.filter('week', week);
    },
    showSstMaxes:function () {
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('sst-maxes'));
    },
    supportsAdd:false,
    supportsArrange:false,
    initialize:function () {
        this.callParent(arguments);
        this.sstToolbar = this.add({
            ui:'light',
            xtype:'toolbar',
            docked:'top'
        });

        this.sstToolbar.add({xtype:'button', text:'Maxes', handler:this.showSstMaxes});
        this.sstToolbar.add({xtype:'spacer'});
        this.weekSelector = this.sstToolbar.add({
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
    },
    listeners:{
        painted:function () {
            biglifts.stores.assistance.SST.addListener('beforesync', this.movementList.refresh, this.movementList);
        },
        destroy:function () {
            biglifts.stores.assistance.SST.removeListener('beforesync', this.movementList.refresh, this.movementList);
        }
    }
});