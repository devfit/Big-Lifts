Ext.ns('wendler.views.liftSchedule.assistance', 'wendler.liftSchedule.assistance.triumvirate');

wendler.liftSchedule.assistance.triumvirate.editTriumvirateMovement = function (dataview, index) {
    var movement = wendler.stores.assistance.TriumvirateMovement.getAt(index);
    wendler.liftSchedule.assistance.triumvirate.showEditTriumvirateMovement(movement);
};

wendler.liftSchedule.assistance.triumvirate.filterTriumvirateMovements = function () {
    wendler.liftSchedule.currentLiftProperty = 'squat';
    wendler.stores.assistance.TriumvirateMovement.clearFilter();
    wendler.stores.assistance.TriumvirateMovement.filter('liftProperty', wendler.liftSchedule.currentLiftProperty);
};

wendler.views.liftSchedule.assistance.Triumvirate = {
    xtype:'panel',
    id:'triumvirate',
    layout:'fit',
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:'Triumvirate',
            items:[
                {
                    text:'Back',
                    ui:'back',
                    handler:wendler.liftSchedule.assistance.returnToAssistanceSelect
                }
            ]
        },
        {
            xtype:'list',
            store:wendler.stores.assistance.TriumvirateMovement,
            itemTpl:"<table class='triumvirate-table'><tbody><tr>" +
                "<td width='66%'><span class='name'>{name}</b></td><td style='text-align:right;' width='34%'>{sets}x {reps}</td>" +
                "</tr></tbody></table>",
            listeners:{
                initialize:function (list) {
                    list.addListener('itemtap', wendler.liftSchedule.assistance.triumvirate.editTriumvirateMovement);
                }
            }

        }

    ],
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.liftSchedule.assistance.returnToAssistanceSelect);
            wendler.liftSchedule.assistance.triumvirate.filterTriumvirateMovements();
        }
    }
};