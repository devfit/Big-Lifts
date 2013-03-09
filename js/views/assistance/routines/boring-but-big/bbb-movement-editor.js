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
                name: null,
                sets: newValues.sets,
                reps: newValues.reps,
                movement_lift_id: lift.get('id')
            };
        } else {
            newValues.movement_lift_id = null;
        }

        var record = this.movementBeingEdited;
        record.set(Ext.merge(_.clone(record.data), newValues));
        biglifts.stores.assistance.BoringButBig.sync();
    },
    showEditBbbMovement: function (movement) {
        this.movementBeingEdited = movement;
        var formRecord = _.clone(movement.data);

        if (formRecord.movement_lift_id) {
            formRecord.lift = biglifts.stores.lifts.Lifts.findRecord('id', formRecord.movement_lift_id).get('name');
        }

        this.switchToBigLift(!!formRecord.movement_lift_id);

        Ext.getCmp('bbb-movement-editor').setValues(formRecord);
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('bbb-movement-editor'));
    },
    switchToBigLift: function (isBigLift) {
        this.isBigLift = isBigLift;

        this.down("[name=isBigLift]").setValue(isBigLift ? 1 : 0);
        this.down("[name=lift]").setHidden(!this.isBigLift);
        this.down("[name=name]").setHidden(this.isBigLift);
        this.down("[name=weight]").setHidden(this.isBigLift);
    },
    bigLiftChanged: function (me, s, t, newValue) {
        this.switchToBigLift(!!newValue);
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
                                name: 'isBigLift',
                                xtype: 'togglefield',
                                displayField: 'value',
                                defaultValue: 0,
                                valueField: 'value',
                                label: "Big Lift?",
                                labelWidth: "60%",
                                listeners: {
                                    change: Ext.bind(me.bigLiftChanged, me)
                                }

                            },
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