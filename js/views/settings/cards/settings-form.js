Ext.ns('wendler.settings.controller');
wendler.settings.controller.resetToDefaults = function () {
    wendler.stores.Settings.first().set(wendler.defaults.settings);
    wendler.stores.Settings.sync();
    Ext.getCmp('settings-form').load(Ext.ModelMgr.create(wendler.defaults.settings, 'Settings'));
};

wendler.settings.controller.reloadForm = function () {
    Ext.getCmp('settings-form').load(wendler.stores.Settings.first());
    Ext.getCmp('settings-form').hasBeenLoaded = true;
};

new Ext.form.FormPanel({
    title:'Settings',
    id:'settings-form',
    scroll:util.scrolling.lockedVerticalScroller,
    dockedItems:[
        {
            dock:'top',
            xtype:'toolbar',
            title:'Settings'
        }
    ],
    listeners:{
        afterlayout:wendler.settings.controller.reloadForm
    },
    items:[
        {
            xtype:'fieldset',
            style:'margin-top: 0; margin-bottom: 0',
            defaults:{
                labelWidth:'50%',
                listeners:{
                    change:function () {
                        var settingsForm = Ext.getCmp('settings-form');
                        if (!settingsForm.hasBeenLoaded) {
                            return;
                        }

                        var settingsRecord = wendler.stores.Settings.first();
                        settingsRecord.set(settingsForm.getValues());
                        settingsRecord.save();
                    }
                }
            },
            items:[
                {
                    xtype:'togglefield',
                    name:'show-warmup-sets',
                    label:"Show warmup"
                },
                {
                    xtype:'selectfield',
                    name:'units',
                    label:"Units",
                    options:wendler.settings.options.units
                },
                {
                    xtype:'selectfield',
                    name:'rounding-value',
                    label:'Round to',
                    options:wendler.settings.options.roundingValues
                },
                {
                    xtype:'selectfield',
                    name:'rounding-type',
                    label:'Rounding',
                    options:wendler.settings.options.roundingType
                }
            ]
        },
        {
            xtype:'spacer',
            height:5
        },
        {
            xtype:'button',
            ui:'decline',
            text:'Reset',
            handler:wendler.settings.controller.resetToDefaults
        }
    ]
});
