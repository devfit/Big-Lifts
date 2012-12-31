Ext.define('biglifts.views.AddLiftPanel', {
    extend: "Ext.Panel",
    addLiftCancelButtonPressed: function () {
        this.addLiftForm.reset();
        Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
    },
    saveNewLift: function (newLiftModel) {
        biglifts.stores.lifts.Lifts.add(newLiftModel);
        biglifts.stores.lifts.Lifts.sync();
    },
    addLiftDoneButtonPressed: function () {
        var liftName = this.addLiftName.getValue();
        var liftMax = this.addLiftMax.getValue();
        var liftProperty = biglifts.stores.lifts.Lifts.sanitizePropertyName(liftName);
        var cycleIncrease = this.addLiftCycleIncrease.getValue();

        var newLiftModel = Ext.create('Lift',
            {name: liftName, propertyName: liftProperty, max: liftMax, cycleIncrease: cycleIncrease, order: this.findNextOrdering() });
        var errors = newLiftModel.validate();

        if (!errors.isValid()) {
            this.handleInvalidLift(errors);
        }
        else {
            this.saveNewLift(newLiftModel);
            this.addLiftForm.reset();
            Ext.getCmp('maxes-panel').setActiveItem(Ext.getCmp('maxes-form'));
        }
    },
    findNextOrdering: function () {
        var orders = [];
        util.withNoFilters(biglifts.stores.lifts.Lifts, function () {
            orders = _.map(biglifts.stores.lifts.Lifts.getRange(), function (record) {
                return record.data.order;
            });
        });
        return _.max(orders) + 1;
    },
    handleInvalidLift: function (errors) {
        var nameErrors = errors.getByField('propertyName');
        var maxErrors = errors.getByField('max');
        var cycleIncreaseErrors = errors.getByField('cycleIncrease');
        var messages = [];

        if (nameErrors.length > 0) {
            for (var i in nameErrors) {
                var nameError = nameErrors[i];
                if (nameError.getMessage() === "must be present") {
                    messages.push("Invalid lift name");
                }
                else if (nameError.getMessage() === "nonunique") {
                    messages.push("Name must be unique");
                }
            }
        }
        if (maxErrors.length > 0) {
            messages.push("Max must be > 0");
        }
        if (cycleIncreaseErrors.length > 0) {
            messages.push("Cycle Increase must be > 0");
        }

        Ext.Msg.alert('Error', messages.join('<br/>'));
    },
    config: {
        id: 'maxes-add-lift-panel',
        layout: 'fit',
        listeners: {
            initialize: function () {
                this.add({
                    xtype: 'toolbar',
                    docked: 'top',
                    title: "New Lift",
                    items: [
                        {
                            text: 'Cancel',
                            handler: Ext.bind(this.addLiftCancelButtonPressed, this),
                            ui: 'action'
                        },
                        {xtype: 'spacer'},
                        {
                            text: 'Save',
                            handler: Ext.bind(this.addLiftDoneButtonPressed, this),
                            ui: 'confirm'
                        }
                    ]
                });

                this.addLiftForm = this.add({
                    xtype: 'formpanel'
                });

                this.addLiftFieldset = this.add({
                    xtype: 'fieldset',
                    style: 'margin-top: 0',
                    defaults: {
                        autoCapitalize: false,
                        autoCorrect: false,
                        autoComplete: false,
                        labelWidth: '40%'
                    }
                });

                this.addLiftName = this.addLiftFieldset.add({
                    xtype: 'textfield',
                    name: 'name',
                    label: 'Name'
                });

                this.addLiftMax = this.addLiftFieldset.add({
                    xtype: 'textfield',
                    name: 'max',
                    label: 'Max'
                });

                this.addLiftCycleIncrease = this.addLiftFieldset.add({
                    xtype: 'textfield',
                    name: 'cycleIncrease',
                    label: 'Cycle increase'
                });
            },
            painted: function () {
                biglifts.navigation.setBackFunction(Ext.bind(this.addLiftCancelButtonPressed, this));
            }
        }
    }
});