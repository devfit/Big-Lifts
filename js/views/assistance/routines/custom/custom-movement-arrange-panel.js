Ext.define('biglifts.views.CustomMovementArrangePanel', {
    extend: "Ext.Panel",
    doneArranging: function () {
        this.getParent().showCustomMovement();
    },
    swapLiftOrder: function (r1, r2) {
        if (r2 === null) {
            return;
        }

        var order1 = r1.get('order');
        var order2 = r2.get('order');

        r1.set('order', order2);
        r2.set('order', order1);

        this.getCustomMovementStore().sync();
    },
    moveUp: function () {
        var selectedRecord = this.customArrangeList.getSelection()[0];
        if (_.isUndefined(selectedRecord)) {
            return;
        }

        var beforeRecord = null;
        this.getCustomMovementStore().each(function (r) {
            if (selectedRecord === r) {
                return;
            }

            if (beforeRecord === null) {
                if (r.get('order') < selectedRecord.get('order')) {
                    beforeRecord = r;
                }
            }
            else {
                var testRecordDifference = selectedRecord.get('order') - r.get('order');
                if (testRecordDifference > 0 && testRecordDifference < selectedRecord.get('order') - beforeRecord.get('order')) {
                    beforeRecord = r;
                }
            }
        });

        this.swapLiftOrder(selectedRecord, beforeRecord);
    },
    moveDown: function () {
        var selectedRecord = this.customArrangeList.getSelection()[0];
        if (_.isUndefined(selectedRecord)) {
            return;
        }

        var afterRecord = null;
        this.getCustomMovementStore().each(function (r) {
            if (afterRecord == null) {
                if (r.get('order') > selectedRecord.get('order')) {
                    afterRecord = r;
                }
            }
            else {
                var testRecordDifference = r.get('order') - selectedRecord.get('order');
                if (testRecordDifference > 0 && testRecordDifference <
                    afterRecord.get('order') - selectedRecord.get('order')) {
                    afterRecord = r;
                }
            }
        });

        this.swapLiftOrder(selectedRecord, afterRecord);
    },
    config: {
        layout: 'fit',
        customMovementStore: null,
        listeners: {
            initialize: function () {
                var me = this;
                var topToolbar = me.add({
                    xtype: 'toolbar',
                    title: 'Custom',
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
                    handler: Ext.bind(me.doneArranging, me)
                });

                me.customArrangeList = me.add(Ext.create('biglifts.views.CustomMovementArrangeList', {
                    store: me.getCustomMovementStore()
                }));

                me.getCustomMovementStore().addListener('beforesync', function () {
                    me.customArrangeList.refresh();
                    me.customArrangeList.element.dom.offsetHeight;
                });
            }
        }
    }
});