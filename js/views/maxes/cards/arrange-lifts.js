Ext.define('biglifts.views.ArrangeLifts', {
    extend: 'Ext.Panel',
    doneButtonPressed: function () {
        Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
    },
    refreshList: function () {
        biglifts.stores.lifts.Lifts.sort('order', 'ASC');
        var list = this.down('#arrange-list');
        list.refresh();
        //TODO: Remove hack when fix is in sencha touch 2. This forces the list to repaint.
        list.element.dom.offsetHeight;
    },
    moveUp: function () {
        var selectedRecord = this.down('#arrange-list').getSelection()[0];
        if (_.isUndefined(selectedRecord)) {
            return;
        }

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
            this.swapLiftOrder(selectedRecord, beforeRecord);
            this.refreshList();
        }
    },
    moveDown: function () {
        var selectedRecord = this.down('#arrange-list').getSelection()[0];
        if (_.isUndefined(selectedRecord)) {
            return;
        }

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
            this.swapLiftOrder(selectedRecord, afterRecord);
            this.refreshList();
        }
    },
    swapLiftOrder: function (lift1, lift2) {
        var order1 = lift1.get('order');
        var order2 = lift2.get('order');

        lift1.set('order', order2);
        lift2.set('order', order1);

        biglifts.stores.lifts.Lifts.sync();
    },
    config: {
        id: 'arrange-lifts',
        xtype: 'panel',
        layout: 'fit',
        listeners: {
            painted: function () {
                biglifts.navigation.setBackFunction(Ext.bind(this.doneButtonPressed, this));
            },
            initialize: function () {
                this.add([
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: "Arrange",
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'arrow_up',
                                iconMask: true,
                                ui: 'confirm',
                                handler: Ext.bind(this.moveUp, this)
                            },
                            {
                                xtype: 'button',
                                iconCls: 'arrow_down',
                                iconMask: true,
                                ui: 'decline',
                                handler: Ext.bind(this.moveDown, this)
                            },
                            {xtype: 'spacer'},
                            {
                                text: 'Done',
                                handler: Ext.bind(this.doneButtonPressed, this),
                                ui: 'action'
                            }
                        ]
                    },
                    {
                        itemId: 'arrange-list',
                        xtype: 'list',
                        store: biglifts.stores.lifts.Lifts,
                        itemCls: 'lift-list-row',
                        itemTpl: '<table width="100%"><tbody><tr>' +
                            '<td width="60%"><span class="lift-name">{name}</span></td>' +
                            '<td width="40%" class="delete-button-holder hidden"></td>' +
                            '</tr></tbody></table>'
                    }
                ]);
            }
        }
    }
});