Ext.define("Biglifts.views.Custom", {
    extend: "Ext.Panel",
    movementEditor: null,
    assistanceType: '',
    filterCustomMovements: function () {
        this.customMovementStore.clearFilter();
        this.customMovementStore.filter('liftProperty', Ext.getCmp('assistance-lift-chooser').currentLiftProperty);
    },
    arrangeAssistance: function () {
        this.movementList.hide();
        this.movementArrangeList.show();

        this.topToolbar.hide();
        this.topArrangeToolbar.show();
        this.bottomToolbar.hide();
    },
    doneArranging: function () {
        this.movementList.show();
        this.movementArrangeList.hide();

        this.topToolbar.show();
        this.topArrangeToolbar.hide();
        this.bottomToolbar.show();
    },
    editCustomMovement: function (dataview, index) {
        var movement = this.customMovementStore.getAt(index);
        Ext.getCmp(this.movementEditor).showEditCustomMovement(movement);
    },
    addCustomMovement: function () {
        this.customMovementStore.add({liftProperty: Ext.getCmp('assistance-lift-chooser').currentLiftProperty, name: "", sets: 5, reps: 15});
        this.customMovementStore.sync();
        Ext.getCmp(this.movementEditor).showEditCustomMovement(this.customMovementStore.last());
    },
    logMovements: function () {
        var me = this;
        this.customMovementStore.each(function (record) {
            var assistanceRecord = {
                movement: record.get('name'),
                assistanceType: me.assistanceType,
                sets: record.get('sets'),
                reps: record.get('reps'),
                weight: record.get('weight'),
                timestamp: new Date().getTime(),
                cycle: biglifts.stores.CurrentCycle.getCurrentCycle()
            };

            biglifts.stores.assistance.ActivityLog.add(assistanceRecord);
            biglifts.stores.assistance.ActivityLog.sync();
        });

        Ext.getCmp('assistance').setActiveItem(0);
        Ext.getCmp('main-tab-panel').setActiveItem(Ext.getCmp('log'));
    },
    config: {
        cls: 'assistance',
        layout: 'fit',
        listeners: {
            initialize: function () {
                var me = this;

                me.topToolbar = me.add({
                    xtype: 'toolbar',
                    docked: 'top',
                    title: me.assistanceType
                });

                me.topArrangeToolbar = me.add({
                    xtype: 'toolbar',
                    docked: 'top',
                    title: me.assistanceType,
                    hidden: true,
                    items: [
                        {xtype: 'spacer'},
                        {
                            xtype: 'button',
                            text: 'Done',
                            handler: Ext.bind(me.doneArranging, me)
                        }
                    ]
                });

                this.backButton = this.topToolbar.add({
                    text: 'Back',
                    ui: 'back',
                    handler: function () {
                        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
                    }
                });

                this.topToolbar.add({
                    xtype: 'spacer'
                });

                this.saveButton = this.topToolbar.add({
                    text: 'Save',
                    ui: 'confirm',
                    listeners: {
                        initialize: function () {
                            this.setHandler(Ext.bind(me.logMovements, me));
                        }
                    }
                });

                me.bottomToolbar = me.add({
                    xtype: 'toolbar',
                    docked: 'bottom',
                    cls: 'unstyled-toolbar',
                    items: [
                        {
                            text: 'Add...',
                            ui: 'confirm',
                            listeners: {
                                initialize: function () {
                                    this.setHandler(Ext.bind(me.addCustomMovement, me));
                                }
                            }
                        }
                    ]
                });

                me.bottomToolbar.add({xtype: 'spacer'});
                me.arrangeButton = me.bottomToolbar.add({
                    xtype: 'button',
                    text: 'Arrange',
                    handler: Ext.bind(me.arrangeAssistance, me)
                });

                me.movementList = me.add(Ext.create('biglifts.views.CustomMovementList', {
                    store: this.customMovementStore,
                    tapAction: Ext.bind(this.editCustomMovement, this)
                }));

                me.movementArrangeList = me.add(Ext.create('biglifts.views.CustomMovementArrangeList', {
                    store: this.customMovementStore,
                    hidden: true
                }));
            },
            painted: function () {
                biglifts.navigation.setBackFunction(function () {
                    Ext.getCmp('assistance').setActiveItem(Ext.getCmp('assistance-chooser'));
                });
                this.filterCustomMovements();
            }
        }
    }
});