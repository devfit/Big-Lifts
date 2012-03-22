Ext.ns('wendler.maxes.cards', 'wendler.maxes.arrangeLifts');

wendler.maxes.arrangeLifts.doneButtonPressed = function () {
    wendler.maxes.controller.rebuildMaxesList();
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
};

wendler.maxes.arrangeLifts.moveUp = function () {
    var selectedRecord = Ext.getCmp('arrange-lifts-list').getSelection()[0];
    var beforeRecord = null;

    wendler.stores.lifts.Lifts.each(function (r) {
        if (selectedRecord === r) {
            return;
        }

        if (beforeRecord === null) {
            if (r.data.order < selectedRecord.data.order) {
                beforeRecord = r;
            }
        }
        else {
            var testRecordDifference = selectedRecord.data.order - r.data.order;
            if (testRecordDifference > 0 && testRecordDifference < selectedRecord.data.order - beforeRecord.data.order) {
                beforeRecord = r;
            }
        }
    });

    if (beforeRecord !== null) {
        wendler.maxes.arrangeLifts.swapLiftOrder(selectedRecord, beforeRecord);
        wendler.maxes.arrangeLifts.refreshList();
    }
};

wendler.maxes.arrangeLifts.refreshList = function () {
    wendler.stores.lifts.Lifts.sort('order', 'ASC');
    Ext.getCmp('arrange-lifts-list').refresh();
};

wendler.maxes.arrangeLifts.moveDown = function () {
    var selectedRecord = Ext.getCmp('arrange-lifts-list').getSelection()[0];
    var afterRecord = null;

    wendler.stores.lifts.Lifts.each(function (r) {
        if (afterRecord == null) {
            if (r.data.order > selectedRecord.data.order) {
                afterRecord = r;
            }
        }
        else {
            var testRecordDifference = r.data.order - selectedRecord.data.order;
            if (testRecordDifference > 0 && testRecordDifference <
                afterRecord.data.order - selectedRecord.data.order) {
                afterRecord = r;
            }
        }
    });

    if (afterRecord !== null) {
        wendler.maxes.arrangeLifts.swapLiftOrder(selectedRecord, afterRecord);
        wendler.maxes.arrangeLifts.refreshList();
    }
};

wendler.maxes.arrangeLifts.swapLiftOrder = function (lift1, lift2) {
    var order1 = lift1.get('order');
    var order2 = lift2.get('order');

    lift1.set('order', order2);
    lift2.set('order', order1);

    lift1.save();
    lift2.save();
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