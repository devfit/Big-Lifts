Ext.define("biglifts.views.CustomPanel", {
    extend: "Ext.Panel",
    filterCustomMovements: function () {
        this.getCustomMovementStore().clearFilter();
        this.getCustomMovementStore().filter('liftProperty', Ext.getCmp('assistance-lift-chooser').currentLiftProperty);
    },
    arrangeAssistance: function () {
        this.getParent().showArrange();
    },
    editCustomMovement: function (dataview, index) {
        var movement = this.getCustomMovementStore().getAt(index);
        Ext.getCmp(this.getMovementEditor()).showEditCustomMovement(movement);
    },
    addCustomMovement: function () {
        this.getCustomMovementStore().add({liftProperty: Ext.getCmp('assistance-lift-chooser').currentLiftProperty, name: "", sets: 5, reps: 15});
        this.getCustomMovementStore().sync();
        Ext.getCmp(this.getMovementEditor()).showEditCustomMovement(this.getCustomMovementStore().last());
    },
    logMovements: function () {
        var me = this;
        this.getCustomMovementStore().each(function (record) {
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
        assistanceType: null,
        customMovementStore: null,
        movementEditor: null,
        listeners: {
            initialize: function () {
                var me = this;

                me.topToolbar = me.add({
                    xtype: 'toolbar',
                    docked: 'top',
                    title: me.getAssistanceType()
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
                    store: this.getCustomMovementStore(),
                    tapAction: Ext.bind(this.editCustomMovement, this)
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