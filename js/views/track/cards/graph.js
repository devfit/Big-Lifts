Ext.ns('biglifts.views.log.cards', 'biglifts.graph');

biglifts.graph.back = function () {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('log-list'));
    Ext.getCmp('tab-navigation').show();
};

Ext.define('biglifts.LiftGraph', {
    extend: 'Ext.Panel',
    xtype: 'liftgraph',
    _setupGraph: function () {
        if (Ext.getCmp('lift-chart')) {
            Ext.getCmp('lift-chart').destroy();
        }

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

        Ext.getCmp('graph').add({
            id: 'lift-chart',
            xtype: 'chart',
            store: biglifts.util.graph.convertLogToGraphStore(),
            animate: true,
            shadow: false,
            legend: {
                position: {
                    portrait: 'bottom',
                    landscape: 'bottom'
                }
            },
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: biglifts.stores.lifts.Lifts.getUniqueLiftNames(),
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
            ],
            series: series
        });
    },
    config: {
        layout: 'fit',
        listeners: {
            painted: function () {
                Ext.getCmp('tab-navigation').hide();
                biglifts.navigation.setBackFunction(biglifts.graph.back);
                this._setupGraph();
            }
        },
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title: 'Graph',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: 'Back',
                        handler: biglifts.graph.back
                    }
                ]
            }
        ]
    }
});

biglifts.views.log.cards.Graph = {
    id: 'graph',
    xtype: 'liftgraph'
};