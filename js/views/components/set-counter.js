Ext.define('biglifts.components.SetCounter', {
    extend: "Ext.Container",
    buttonTapped: function () {
        this.currentSet++;
        this.setButton.setText(this.currentSet + "");
    },
    clearSetCount: function () {
        this.currentSet = 0;
        this.setButton.setText("0");
    },
    config: {
        layout: 'hbox',
        listeners: {
            initialize: function () {
                var me = this;
                me.currentSet = 0;

                me.add({
                    cls: 'clear-icon set-counter-clear',
                    listeners: {
                        painted: function () {
                            if (!this._painted) {
                                this._painted = true;
                                this.element.addListener('tap', Ext.bind(me.clearSetCount, me));
                            }
                        }
                    }
                });

                me.add({
                    html: 'Set',
                    padding: '4 4 0 0'
                });

                me.setButton = this.add(Ext.create('Ext.Button', {
                    ui: 'confirm',
                    cls: 'set-counter',
                    text: this.currentSet + "",
                    style: 'padding-left: 20px; padding-right: 20px',
                    handler: Ext.bind(this.buttonTapped, this)
                }));
            }
        }
    }
});