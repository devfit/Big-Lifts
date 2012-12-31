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
        var sortStore = biglifts.stores.LogSort.first();
        var property = sortStore.get('property');
        if (property === selectedProperty) {
            sortStore.set('ascending', !sortStore.get('ascending'));
        }
        else {
            var defaultAscending = {
                'timestamp': false,
                'liftName': true
            };

            sortStore.set('property', selectedProperty);
            sortStore.set('ascending', defaultAscending[selectedProperty]);
        }
        biglifts.stores.LogSort.sync();
    },
    updateUiForSortButtons: function () {
        var sortStore = biglifts.stores.LogSort.first();

        if (sortStore.get('property') === "liftName") {
            if (this.getAlphaEnabled()) {
                this.sortNameButton.hide();
                this.sortNameActiveButton.show();
            }

            this.sortDateActiveButton.hide();
            this.sortDateButton.show();
        }
        else if (sortStore.get('property') === "timestamp") {
            if (this.getAlphaEnabled()) {
                this.sortNameActiveButton.hide();
                this.sortNameButton.show();
            }

            this.sortDateButton.hide();
            this.sortDateActiveButton.show();
        }

        this.updateAscendingText();
    },
    updateAscendingText: function () {
        var sortStore = biglifts.stores.LogSort.first();

        var sortProperty = sortStore.data.property;
        var sortDirectionText = sortStore.data.ascending ? "ASC" : "DESC";
        if (sortProperty === "liftName") {
            if( this.getAlphaEnabled() ){
                this.sortNameButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);
                this.sortNameActiveButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['liftName'][sortDirectionText]);
            }

            var dateText = this.PROPERTY_TO_ASCENDING_TEXT['timestamp'][this.DEFAULT_PROPERTY_ASCENDING['timestamp']];
            this.sortDateButton.setText(dateText);
            this.sortDateActiveButton.setText(dateText);
        }
        else if (sortProperty === "timestamp") {
            this.sortDateButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);
            this.sortDateActiveButton.setText(this.PROPERTY_TO_ASCENDING_TEXT['timestamp'][sortDirectionText]);

            var liftNameText = this.PROPERTY_TO_ASCENDING_TEXT['liftName'][this.DEFAULT_PROPERTY_ASCENDING['liftName']];

            if( this.getAlphaEnabled() ){
                this.sortNameButton.setText(liftNameText);
                this.sortNameActiveButton.setText(liftNameText);
            }
        }
    },
    config: {
        alphaEnabled: true,
        dateEnabled: true,
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
                    biglifts.stores.LogSort.addListener('beforesync', Ext.bind(this.updateUiForSortButtons, this));
                }
            },
            initialize: function () {
                var me = this;
                if (this.getAlphaEnabled()) {
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
                }

                if (this.getDateEnabled()) {
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
    }
});
