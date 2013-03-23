Ext.define('biglifts.components.SetCounter', {
    extend: "Ext.Container",
    buttonTapped: function () {
        this.currentSet++;
        this.setButton.setText(this.currentSet + "");
    },
    setClearTapped: function () {
        this.currentSet = 0;
        this.setButton.setText("0");

        this.clearIcon.hide();
        this.clearIconDark.show();

        Ext.Function.defer(function () {
            this.clearIcon.show();
            this.clearIconDark.hide();
        }, 100, this);
    },
    config: {
        layout: 'hbox',
        listeners: {
            initialize: function () {
                var me = this;
                me.currentSet = 0;

                var clearContainer = me.add({
                    xtype: 'container',
                    layout: 'fit',
                    width: 48,
                    height: 32,
                    listeners: {
                        painted: function () {
                            if (!this._painted) {
                                this._painted = true;
                                this.element.addListener('tap', Ext.bind(me.setClearTapped, me));
                            }
                        }
                    }
                });

                me.clearIcon = clearContainer.add([
                    {
                        height: 24,
                        cls: 'clear-icon set-counter-clear'
                    }
                ]);

                me.clearIconDark = clearContainer.add([
                    {
                        hidden: true,
                        height: 24,
                        cls: 'clear-icon-dark set-counter-clear'
                    }
                ]);

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