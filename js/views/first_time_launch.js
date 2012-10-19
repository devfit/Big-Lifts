Ext.define('biglifts.views.FirstTimeLaunch', {
    extend:'Ext.form.Panel',
    xtype:'first-time-launch',
    config:{
        layout:'vbox',
        items:[
            {
                xtype:'toolbar',
                docked:'top',
                title:'Big Lifts'
            },
            {
                html:'<h1 class="first-time-launch-header">What are you lifting?</h1>',
                height:30
            },
            {
                flex:1,
                xtype:'list',
                onItemDisclosure:true,
                padding:0,
                cls:'first-time-launch-list',
                store:biglifts.stores.Routines,
                itemTpl:'{name}'
            }
        ]
    }
});