Ext.define('biglifts.views.templates.Powerlifting', {
    extend: 'biglifts.views.templates.Base',
    constructor: function () {
        this.callParent(arguments);
        var me = this;
        this.add({
            xtype: 'toolbar',
            docked: 'top',
            title: "Powerlifting",
            items: [
                {
                    text: 'Back',
                    ui: 'back',
                    handler: Ext.bind(me.carouselBack, me)
                },
                {xtype: 'spacer'},
                {
                    text: 'Next',
                    ui: 'forward',
                    handler: Ext.bind(me.carouselForward, me)
                }
            ]
        });

        this.add(this.buildUseToolbar(function () {
            me.setupLiftScheme("powerlifting");
        }));

        this.add({
            html: '<div class="example-percentages"><span style="font-weight:bold">Pre-Meet (raw)</span>' +
                '<table>' +
                '<thead><tr><th>Week</th><th>Scheme</th></tr></thead>' +
                '<tbody class="example-percentages-table">' +
                '<tr><td>1</td><td>3x 70, 3x 80, 3x 90<p>1x 85 goal, 1x92.5 goal</p></td></tr>' +
                '<tr><td>2</td><td>5x 65, 5x 75, 5x 85</td></tr>' +
                '<tr><td>3</td><td>5x 75, 3x 85, 1x 95<p>1x 85 goal, 1x95 goal</p></td></tr>' +
                '<tr><td>4</td><td>5x 40, 5x 50, 5x 60</td></tr></tbody>' +
                '</table>' +
                '</div>',
            margin: "0 0 5 0"
        });
    }
});