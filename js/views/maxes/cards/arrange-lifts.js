Ext.ns('biglifts.maxes.cards', 'biglifts.maxes.arrangeLifts');

biglifts.maxes.arrangeLifts.doneButtonPressed = function () {
    biglifts.maxes.controller.rebuildMaxesList();
    Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
};

biglifts.maxes.arrangeLifts.moveUp = function () {
    var selectedRecord = Ext.getCmp('arrange-lifts-list').getSelection()[0];
    var beforeRecord = null;

    biglifts.stores.lifts.Lifts.each(function (r) {
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
        biglifts.maxes.arrangeLifts.swapLiftOrder(selectedRecord, beforeRecord);
        biglifts.maxes.arrangeLifts.refreshList();
    }
};

biglifts.maxes.arrangeLifts.refreshList = function () {
    biglifts.stores.lifts.Lifts.sort('order', 'ASC');
    var list = Ext.getCmp('arrange-lifts-list');
    list.refresh();
    //TODO: Remove hack when fix is in sencha touch 2. This forces the list to repaint.
    list.element.dom.offsetHeight;
};

biglifts.maxes.arrangeLifts.moveDown = function () {
    var selectedRecord = Ext.getCmp('arrange-lifts-list').getSelection()[0];
    var afterRecord = null;

    biglifts.stores.lifts.Lifts.each(function (r) {
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
        biglifts.maxes.arrangeLifts.swapLiftOrder(selectedRecord, afterRecord);
        biglifts.maxes.arrangeLifts.refreshList();
    }
};

biglifts.maxes.arrangeLifts.swapLiftOrder = function (lift1, lift2) {
    var order1 = lift1.get('order');
    var order2 = lift2.get('order');

    lift1.set('order', order2);
    lift2.set('order', order1);

    lift1.save();
    lift2.save();
    biglifts.stores.lifts.Lifts.sync();
};

biglifts.maxes.cards.ArrangeLifts = {
    id:'arrange-lifts',
    xtype:'panel',
    layout:'fit',
    listeners:{
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.maxes.arrangeLifts.doneButtonPressed);
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
                    handler:biglifts.maxes.arrangeLifts.moveUp
                },
                {
                    id:'arrange-lifts-down-button',
                    xtype:'button',
                    iconCls:'arrow_down',
                    iconMask:true,
                    ui:'decline',
                    handler:biglifts.maxes.arrangeLifts.moveDown
                },
                {xtype:'spacer'},
                {
                    id:'arrange-lifts-done-button',
                    text:'Done',
                    handler:biglifts.maxes.arrangeLifts.doneButtonPressed,
                    ui:'action'
                }
            ]
        },
        {
            id:'arrange-lifts-list',
            xtype:'list',
            store:biglifts.stores.lifts.Lifts,
            itemCls:'lift-list-row',
            itemTpl:'<table width="100%"><tbody><tr>' +
                '<td width="60%"><span class="lift-name">{name}</span></td>' +
                '<td width="40%" class="delete-button-holder hidden"></td>' +
                '</tr></tbody></table>'
        }
    ]
};