Ext.define('biglifts.views.LiftGraph', {
    extend: 'Ext.Panel',
    xtype: 'liftgraph',
    getLiftAxes: function (lift_id) {
        var liftFields = biglifts.stores.lifts.Lifts.getUniqueLiftNames();

        return [
            {
                type: 'Numeric',
                position: 'left',
                fields: liftFields,
                label: {
                    renderer: function (v) {
                        return v.toFixed(1);
                    }
                },
                title: 'Est. 1RM',
                grid: {
                    odd: {
                        opacity: 1,
                        stroke: '#aaa',
                        'stroke-width': 1
                    }
                }
            },
            {
                type: 'Category',
                position: 'bottom',
                label: {
                    renderer: function (date) {
                        var dateFormat = biglifts.stores.w.Settings.first().get('dateFormat');
                        var datePieces = dateFormat.split("/");
                        var format = datePieces[0] + "/" + datePieces[1];
                        return date.toString(format);
                    },
                    rotate: {
                        degrees: 315
                    }
                },
                fields: ['date'],
                title: 'Date'
            }
        ];
    },
    _setupGraph: function () {
        if (this.liftChart) {
            this.liftChart.bindStore(biglifts.util.graph.convertLogToGraphStore('all'));
        }
        else {
            var series = [];
            _.each(biglifts.stores.lifts.Lifts.getUniqueLiftNames(), function (lift) {
                series.push({
                    type: 'line',
                    xField: 'date',
                    yField: lift,
                    axis: 'left',
                    highlight: true,
                    showInLegend: true
                });
            });

            this.liftChart = this.add({
                xtype: 'chart',
                store: biglifts.util.graph.convertLogToGraphStore('all'),
                animate: true,
                shadow: false,
                legend: {
                    position: {
                        portrait: 'bottom',
                        landscape: 'bottom'
                    }
                },
                axes: this.getLiftAxes('all'),
                series: series
            });
        }
    },
    back: function () {
        Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'));
        Ext.getCmp('tab-navigation').show();
    },
    getLiftOptions: function () {
        var options = [
            {text: 'All', value: 'all'}
        ];
        biglifts.stores.lifts.Lifts.each(function (l) {
            options.push({text: l.get('name'), value: l.get('id')});
        });
        return options;
    },
    liftSelected: function (select, newValue, oldValue) {
        var graphStore = biglifts.util.graph.convertLogToGraphStore(newValue);
        this.liftChart.bindStore(graphStore);
        this.hackSelectLift(newValue);
        this.liftChart.redraw();
    },
    hackSelectLift: function (lift) {
        _.each(this.liftChart.getSeries().items, function (series) {
            series.hideAll();
        });

        if (lift === "all") {
            _.each(this.liftChart.getSeries().items, function (series) {
                series.showAll();
            });
        }
        else {
            var liftName = biglifts.stores.lifts.Lifts.findRecord('id', lift).get('name');
            _.each(this.liftChart.getSeries().items, function (series) {
                if (series._yField[0] === liftName) {
                    series.showAll();
                }
            });
        }
    },
    constructor: function () {
        this.callParent(arguments);
        this.topToolbar = this.add({
            docked: 'top',
            xtype: 'toolbar',
            title: 'Graph'
        });
        this.topToolbar.add({
            xtype: 'button',
            ui: 'back',
            text: 'Back',
            handler: this.back
        });
        this.topToolbar.add({xtype: 'spacer'});

        this.liftSelector = this.topToolbar.add({
            xtype: 'selectfield',
            options: this.getLiftOptions(),
            name: 'lifts',
            listeners: {
                change: Ext.bind(this.liftSelected, this)
            }
        });
    },
    resetLiftOptions: function () {
        this.liftSelector.setOptions(this.getLiftOptions());
    },
    bindListeners: function () {
        biglifts.stores.lifts.Lifts.addListener('beforesync', this.resetLiftOptions, this);
    },
    destroyListeners: function () {
        biglifts.stores.lifts.Lifts.removeListener('beforesync', this.resetLiftOptions, this);
    },
    config: {
        layout: 'fit',
        listeners: {
            painted: function () {
                Ext.getCmp('tab-navigation').hide();
                biglifts.navigation.setBackFunction(this.back);
                this._setupGraph();

                if (!this._painted) {
                    this._painted = true;
                    this.bindListeners();
                }
            },
            destroy: function () {
                this.destroyListeners();
            }
        }
    }
});