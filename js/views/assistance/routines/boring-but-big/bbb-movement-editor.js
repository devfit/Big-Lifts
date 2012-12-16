Ext.define('biglifts.views.BoringButBigMovementEditor', {
    extend: "Ext.form.Panel",
    returnToBbb: function () {
        this.saveMovementChange();
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('boring-but-big'));
    },
    deleteMovement: function () {
        biglifts.stores.assistance.BoringButBig.remove(this.movementBeingEdited);
        biglifts.stores.assistance.BoringButBig.sync();
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('boring-but-big'));
    },
    saveMovementChange: function () {
        var newValues = this.getValues();

        if (this.isBigLift) {
            var lift = biglifts.stores.lifts.Lifts.findRecord('propertyName', newValues.lift);
            newValues = {
                sets: newValues.sets,
                reps: newValues.reps,
                movement_lift_id: lift.get('id')
            };
        }

        var record = this.movementBeingEdited;
        record.set(Ext.merge(_.clone(record.data), newValues));
        biglifts.stores.assistance.BoringButBig.sync();
    },
    showEditBbbMovement: function (movement) {
        this.movementBeingEdited = movement;
        var formRecord = _.clone(movement.data);

        this.isBigLift = !!formRecord.movement_lift_id;
        if (this.isBigLift) {
            var lift = biglifts.stores.lifts.Lifts.findRecord('id', formRecord.movement_lift_id);
            formRecord.lift = lift.get('propertyName');
        }

        this.down("[name=lift]").setHidden(!this.isBigLift);

        this.down("[name=name]").setHidden(this.isBigLift);
        this.down("[name=weight]").setHidden(this.isBigLift);

        Ext.getCmp('bbb-movement-editor').setValues(formRecord);
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('bbb-movement-editor'));
    },
    config: {
        id: 'bbb-movement-editor',
        listeners: {
            initialize: function () {
                var me = this;
                me.add([
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: 'Edit',
                        items: [
                            {
                                xtype: 'button',
                                ui: 'back',
                                text: 'Back',
                                handler: Ext.bind(me.returnToBbb, me)
                            },
                            {xtype: 'spacer'},
                            {
                                id: 'bbb-delete-button',
                                ui: 'decline',
                                iconMask: true,
                                iconCls: 'trash',
                                handler: Ext.bind(me.deleteMovement, me)
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        cls: 'fieldset-title-no-margin',
                        items: [
                            {
                                name: 'lift',
                                xtype: 'selectfield',
                                valueField: 'propertyName',
                                displayField: 'name',
                                label: 'Lift',
                                store: biglifts.stores.lifts.Lifts
                            },
                            {
                                xtype: 'textfield',
                                label: 'Name',
                                name: 'name'
                            },
                            {
                                xtype: 'numberfield',
                                label: 'Sets',
                                name: 'sets'
                            },
                            {
                                xtype: 'numberfield',
                                label: 'Reps',
                                name: 'reps'
                            },
                            {
                                xtype: 'numberfield',
                                label: 'Weight',
                                name: 'weight'
                            }
                        ]
                    }
                ]);
            },
            painted: function () {
                biglifts.navigation.setBackFunction(Ext.bind(this.returnToBbb, this));
            }
        }
    }
});