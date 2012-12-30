Ext.define('biglifts.components.SortToolbar', {
    extend: 'Ext.Toolbar',
    DEFAULT_PROPERTY_ASCENDING: {
        'liftName': 'ASC',
        'timestamp': 'DESC'
    },
    PROPERTY_TO_ASCENDING_TEXT: {
        'liftName': {
            'ASC': 'A-Z',
            'DESC': 'Z-A'
        },
        'timestamp': {
            'ASC': 'Oldest',
            'DESC': 'Newest'
        }
    },
    sortBy: function (selectedProperty) {
        var liftLogSort = biglifts.stores.LiftLogSort.first();
        var property = liftLogSort.get('property');
        if (property === selectedProperty) {
            liftLogSort.set('ascending', !liftLogSort.get('ascending'));
        }
        else {
            var defaultAscending = {
                'timestamp': false,
                'liftName': true
            };

            liftLogSort.set('property', selectedProperty);
            liftLogSort.set('ascending', defaultAscending[selectedProperty]);
        }
        biglifts.stores.LiftLogSort.sync();
    },
    updateUiForSortButtons: function () {
        var liftLogSort = biglifts.stores.LiftLogSort.first();

        if (liftLogSort.get('property') === "liftName") {
            this.sortNameButton.hide();
            this.sortNameActiveButton.show();

            this.sortDateActiveButton.hide();
            this.sortDateButton.show();
        }
        else if (liftLogSort.get('property') === "timestamp") {
            this.sortNameActiveButton.hide();
            this.sortNameButton.show();

            this.sortDateButton.hide();
            this.sortDateActiveButton.show();
        }

        this.updateAscendingText();
    },
    updateAscendingText: function () {
        var liftLogSort = biglifts.stores.LiftLogSort.first();

        var sortProperty = liftLogSort.data.property;
        var sortDirectionText = liftLogSort.data.ascending ? "ASC" : "DESC";
        if (sortProperty === "liftName") {
            this.sortNameButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);
            this.sortNameActiveButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);

            var dateText = this.PROPERTY_TO_ASCENDING_TEXT['timestamp'][this.DEFAULT_PROPERTY_ASCENDING['timestamp']];
            this.sortDateButton.setText(dateText);
            this.sortDateActiveButton.setText(dateText);
        }
        else if (sortProperty === "timestamp") {
            this.sortDateButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);
            this.sortDateActiveButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);

            var liftNameText = this.PROPERTY_TO_ASCENDING_TEXT['liftName'][this.DEFAULT_PROPERTY_ASCENDING['liftName']];
            this.sortNameButton.setText(liftNameText);
            this.sortNameActiveButton.setText(liftNameText);
        }
    },
    config: {
        docked: 'top',
        xtype: 'toolbar',
        ui: 'light',
        hidden: true,
        showAnimation: {
            type: 'slide',
            direction: 'down'
        },
        listeners: {
            painted: function () {
                this.updateUiForSortButtons();
                if (!this._painted) {
                    this._painted = true;
                    biglifts.stores.LiftLogSort.addListener('beforesync', Ext.bind(this.updateUiForSortButtons, this));
                }
            },
            initialize: function () {
                var me = this;
                me.sortNameButton = me.add({
                    ui: 'action',
                    xtype: 'button',
                    text: "A-Z",
                    handler: function () {
                        me.sortBy('liftName');
                    }
                });

                me.sortNameActiveButton = me.add({
                    hidden: true,
                    ui: 'confirm',
                    xtype: 'button',
                    text: "A-Z",
                    handler: function () {
                        me.sortBy('liftName');
                    }
                });

                me.sortDateButton = me.add({
                    ui: 'action',
                    xtype: 'button',
                    text: "Newest",
                    handler: function () {
                        me.sortBy('timestamp');
                    }
                });

                me.sortDateActiveButton = me.add({
                    hidden: true,
                    ui: 'confirm',
                    xtype: 'button',
                    text: "Newest",
                    handler: function () {
                        me.sortBy('timestamp');
                    }
                });
            }
        }
    }
});
