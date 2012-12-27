Ext.define('biglifts.components.ConfigGear', {
    extend: "Ext.Label",
    config: {
        cls: 'x-field config-field',
        record: null,
        tapAction: null,
        listeners: {
            initialize: function () {
                var html = "<div class='config-gear'";
                var name = this.getRecord().get('name');
                if (name) {
                    html += " data-name='" + name + "'";
                }
                html += "></div>";

                this.setHtml(html);
            },
            painted: function () {
                if (!this._painted) {
                    this._painted = true;
                    this.element.on('tap', Ext.bind(this.getTapAction(), this));
                }
            }
        }
    }
});