Ext.ns('wendler.views.liftSchedule.assistance');
Ext.define('BoringButBigLift', {
    extend:'Ext.data.Model',
    config:{
        identifier:'uuid',
        fields:[
            {name:'id', type:'string'},
            {name:'weight', type:'string'},
            {name:'reps', type:'int'},
            {name:'percentage', type:'int'}
        ],
        proxy:{
            type:'memory',
            id:'lift-log-proxy'
        }
    }
});

wendler.views.liftSchedule.assistance.liftStore = Ext.create('Ext.data.Store', {
    model:'BoringButBigLift'
});

wendler.views.liftSchedule.assistance.setupAssistanceLiftStore = function () {
    wendler.views.liftSchedule.assistance.liftStore.removeAll();
    var bbbPercentage = 50;
    var liftWeight = wendler.liftSchedule.liftTemplate.formatLiftWeight(wendler.liftSchedule.currentShowingMax, bbbPercentage);

    for( var i = 0; i < 5; i++ ){
        wendler.views.liftSchedule.assistance.liftStore.add({
            weight:liftWeight,
            reps:'10',
            percentage:bbbPercentage
        });
    }
};

wendler.views.liftSchedule.assistance.returnToAssistanceSelect = function () {
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('assistance-chooser'));
};

wendler.views.liftSchedule.assistance.BoringButBig = {
    xtype:'panel',
    id:'boring-but-big',
    layout:'fit',
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:'Boring But Big',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.views.liftSchedule.assistance.returnToAssistanceSelect
                },
                {xtype:'spacer'},
                {
                    style:'z-index: 11',
                    id:'boring-but-big-done-button',
                    iconCls:'done',
                    iconMask:true,
                    ui:'action',
                    handler:function () {
                    }
                }
            ]
        },
        {
            id:'boring-but-big-list',
            xtype:'list',
            store:wendler.views.liftSchedule.assistance.liftStore,
            selectedCls:'lift-row-selected',
            itemCls:'lift-row',
            listeners:{
                itemtap:function (c, index) {
//                    wendler.liftTemplate.controller.selectThreeLiftsFrom(index);
                }
            },
            itemTpl:'<p class="reps-weight"><span class="reps">{reps}</span> ' +
                '<span>{weight}</span>' +
                '<span class="percentage">{percentage}%</span></p>'
        }
    ],
    listeners:{
        show:function () {
            wendler.views.liftSchedule.assistance.setupAssistanceLiftStore();
            wendler.navigation.setBackFunction(wendler.views.liftSchedule.assistance.returnToAssistanceSelect);
//            wendler.liftTemplate.controller.selectThreeLiftsFrom(0);
        }
    }
};