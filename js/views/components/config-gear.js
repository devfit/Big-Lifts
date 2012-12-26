Ext.define('biglifts.components.ConfigGear', {
    extend: "Ext.Label",
    config: {
        cls: 'x-field config-field',
        html: "<div class='config-gear'></div>",
        record: null,
        tapAction: null,
        listeners: {
            painted: function () {
                if (!this._painted) {
                    this._painted = true;
                    this.element.on('tap', Ext.bind(this.getTapAction(), this));
                }
            }
        }
    }
});