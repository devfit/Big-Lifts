Ext.define('biglifts.views.templates.Heavier', {
    extend: 'biglifts.views.templates.Base',
    constructor: function () {
        this.callParent(arguments);

        var me = this;
        this.add({
            xtype: 'toolbar',
            docked: 'top',
            title: "Heavier",
            items: [
                {
                    text: 'Back',
                    ui: 'back',
                    handler: Ext.bind(this.carouselBack, this)
                },
                {xtype: 'spacer'},
                {
                    text: 'Next',
                    ui: 'forward',
                    handler: Ext.bind(this.carouselForward, this)
                }
            ]
        });

        this.add(this.buildUseToolbar(function () {
            me.setupLiftScheme("heavier");
        }));

        this.add({
            html: '<div class="example-percentages">' +
                '<table>' +
                '<thead><tr><th>Week</th><th>Scheme</th></tr></thead>' +
                '<tbody class="example-percentages-table">' +
                '<tr><td>1</td><td>5x 75, 5x 80, 5x 85</td></tr>' +
                '<tr><td>2</td><td>3x 80, 3x 85, 3x 90</td></tr>' +
                '<tr><td>3</td><td>5x 75, 3x 85, 1x 95</td></tr>' +
                '<tr><td>4</td><td>5x 40, 5x 50, 5x 60</td></tr></tbody>' +
                '</table>' +
                '</div>',
            margin: "0 0 5 0"
        });
    }
});