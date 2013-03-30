Ext.define('biglifts.components.ArrangePanel', {
    extend: "Ext.Panel",
    arrangeListClass: 'biglifts.views.CustomMovementArrangeList',
    orderProperty: 'order',
    done: function () {
        throw "abstract";
    },
    swapLiftOrder: function (r1, r2) {
        if (r2 === null) {
            return;
        }

        var order1 = r1.get(this.orderProperty);
        var order2 = r2.get(this.orderProperty);

        r1.set(this.orderProperty, order2);
        r2.set(this.orderProperty, order1);

        this.getCustomMovementStore().sync();
    },
    moveUp: function () {
        var selectedRecord = this.arrangeList.getSelection()[0];
        if (_.isUndefined(selectedRecord)) {
            return;
        }

        var me = this;
        var beforeRecord = null;
        this.getCustomMovementStore().each(function (r) {
            if (selectedRecord === r) {
                return;
            }

            if (beforeRecord === null) {
                if (r.get(me.orderProperty) < selectedRecord.get(me.orderProperty)) {
                    beforeRecord = r;
                }
            }
            else {
                var testRecordDifference = selectedRecord.get(me.orderProperty) - r.get(me.orderProperty);
                if (testRecordDifference > 0 && testRecordDifference < selectedRecord.get(me.orderProperty) - beforeRecord.get(me.orderProperty)) {
                    beforeRecord = r;
                }
            }
        });

        this.swapLiftOrder(selectedRecord, beforeRecord);
    },
    moveDown: function () {
        var selectedRecord = this.arrangeList.getSelection()[0];
        if (_.isUndefined(selectedRecord)) {
            return;
        }

        var afterRecord = null;
        var me = this;
        this.getCustomMovementStore().each(function (r) {
            if (afterRecord == null) {
                if (r.get(me.orderProperty) > selectedRecord.get(me.orderProperty)) {
                    afterRecord = r;
                }
            }
            else {
                var testRecordDifference = r.get(me.orderProperty) - selectedRecord.get(me.orderProperty);
                if (testRecordDifference > 0 && testRecordDifference <
                    afterRecord.get(me.orderProperty) - selectedRecord.get(me.orderProperty)) {
                    afterRecord = r;
                }
            }
        });

        this.swapLiftOrder(selectedRecord, afterRecord);
    },
    bindListeners: function () {
        this.getCustomMovementStore().addListener('beforesync', this.refreshArrangeList, this);
    },
    destroyListeners: function () {
        this.getCustomMovementStore().removeListener('beforesync', this.refreshArrangeList, this);
    },
    refreshArrangeList: function () {
        this.arrangeList.refresh();
        this.arrangeList.element.dom.offsetHeight;
    },
    config: {
        layout: 'fit',
        customMovementStore: null,
        listeners: {
            initialize: function () {
                var me = this;
                var topToolbar = me.add({
                    xtype: 'toolbar',
                    title: 'Arrange',
                    docked: 'top'
                });

                topToolbar.add([
                    {
                        xtype: 'button',
                        iconCls: 'arrow_up',
                        iconMask: true,
                        ui: 'confirm',
                        handler: Ext.bind(me.moveUp, me)
                    },
                    {
                        xtype: 'button',
                        iconCls: 'arrow_down',
                        iconMask: true,
                        ui: 'decline',
                        handler: Ext.bind(me.moveDown, me)
                    }
                ]);
                topToolbar.add({xtype: 'spacer'});
                topToolbar.add({
                    xtype: 'button',
                    text: 'Done',
                    handler: Ext.bind(me.done, me)
                });

                me.arrangeList = me.add(Ext.create(me.arrangeListClass, {store: me.getCustomMovementStore()}));
                this.bindListeners();
            },
            destroy: function () {
                this.destroyListeners();
            },
            painted: function () {
                this.refreshArrangeList();
            }
        }
    }
});