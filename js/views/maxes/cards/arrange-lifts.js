Ext.ns('wendler.maxes.cards', 'wendler.maxes.arrangeLifts');

wendler.maxes.arrangeLifts.doneButtonPressed = function () {
    wendler.maxes.controller.rebuildMaxesList();
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
};

wendler.maxes.arrangeLifts.getSelectedIndex = function () {
    var selected = Ext.getCmp('arrange-lifts-list').getSelection();
    var index = -1;
    if (selected.length > 0) {
        index = wendler.stores.lifts.Lifts.indexOf(selected[0]);
    }
    return index;
};

wendler.maxes.arrangeLifts.moveUp = function () {
    var index = wendler.maxes.arrangeLifts.getSelectedIndex();
    if (index >= 1) {
        wendler.maxes.arrangeLifts.swapLiftsByOrder(index, index - 1);
    }

    wendler.maxes.arrangeLifts.refreshList();
};

wendler.maxes.arrangeLifts.moveDown = function () {
    var index = wendler.maxes.arrangeLifts.getSelectedIndex();
    if (index < wendler.stores.lifts.Lifts.getCount() - 1) {
        wendler.maxes.arrangeLifts.swapLiftsByOrder(index, index + 1);
    }

    wendler.maxes.arrangeLifts.refreshList();
};

wendler.maxes.arrangeLifts.swapLiftsByOrder = function (order1, order2) {
    var order1Record = wendler.stores.lifts.Lifts.findRecord('order', order1);
    var order2Record = wendler.stores.lifts.Lifts.findRecord('order', order2);
    order1Record.set('order', order2);
    order2Record.set('order', order1);
    order1Record.save();
    order2Record.save();
};

wendler.maxes.arrangeLifts.refreshList = function () {
    wendler.stores.lifts.Lifts.sort('order', 'ASC');
    Ext.getCmp('arrange-lifts-list').refresh();
};

wendler.maxes.cards.ArrangeLifts = {
    id:'arrange-lifts',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            wendler.navigation.setBackFunction(wendler.maxes.arrangeLifts.doneButtonPressed);
        }
    },
    items:[
        {
            xtype:'toolbar',
            docked:'top',
            title:"Arrange",
            items:[
                {
                    id:'arrange-lifts-up-button',
                    xtype:'button',
                    iconCls:'arrow_up',
                    iconMask:true,
                    ui:'confirm',
                    handler:wendler.maxes.arrangeLifts.moveUp
                },
                {
                    id:'arrange-lifts-down-button',
                    xtype:'button',
                    iconCls:'arrow_down',
                    iconMask:true,
                    ui:'decline',
                    handler:wendler.maxes.arrangeLifts.moveDown
                },
                {xtype:'spacer'},
                {
                    id:'arrange-lifts-done-button',
                    text:'Done',
                    handler:wendler.maxes.arrangeLifts.doneButtonPressed,
                    ui:'action'
                }
            ]
        },
        {
            id:'arrange-lifts-list',
            xtype:'list',
            store:wendler.stores.lifts.Lifts,
            itemCls:'lift-list-row',
            itemTpl:'<table width="100%"><tbody><tr>' +
                '<td width="60%"><span class="lift-name">{name}</span></td>' +
                '<td width="40%" class="delete-button-holder hidden"></td>' +
                '</tr></tbody></table>'
        }
    ]
};