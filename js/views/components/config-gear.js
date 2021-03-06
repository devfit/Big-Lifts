Ext.define('biglifts.components.ConfigGear', {
    extend:"Ext.Label",
    config:{
        cls:'x-field config-field',
        record:null,
        tapAction:null,
        listeners:{
            initialize:function () {
                var html = "<div class='config-gear'";
                if (this.getRecord()) {
                    var name = this.getRecord().get('name');
                    if (name) {
                        name = name.replace(/\s/g, '');
                        html += " data-name='" + name + "'";
                    }
                }
                html += "></div>";

                this.setHtml(html);
            },
            painted:function () {
                if (!this._painted) {
                    this._painted = true;
                    this.element.on('tap', Ext.bind(this.getTapAction(), this));
                }
            }
        }
    }
});