Ext.define('biglifts.views.IncreaseMaxesHelp', {
    extend:'Ext.form.Panel',
    closeIncreaseMaxesHelpScreen:function () {
        this.increasesFieldset.getItems().each(function (f) {
            var lift = biglifts.stores.lifts.Lifts.findRecord('id', f.getName());
            lift.set('cycleIncrease', f.getValue());
        });
        biglifts.stores.lifts.Lifts.sync();
        Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('cycle-complete'));
    },
    rebuildFieldsets:function () {
        this.increasesFieldset.removeAll();
        biglifts.stores.lifts.Lifts.filter('enabled', true);
        biglifts.stores.lifts.Lifts.each(function (l) {
            this.increasesFieldset.add({
                xtype:'numberfield',
                labelWidth:'66%',
                label:l.get('name'),
                value:l.get('cycleIncrease'),
                name:l.get('id')
            });
        }, this);
    },
    constructor:function () {
        this.callParent(arguments);

        this.add({
            docked:'top',
            xtype:'toolbar',
            title:'Increases',
            items:[
                {
                    xtype:'button',
                    text:'Back',
                    ui:'back',
                    handler:Ext.bind(this.closeIncreaseMaxesHelpScreen, this)
                }
            ]
        });

        this.increasesFieldset = this.add({
            xtype:'fieldset'
        });
    },
    config:{
        id:'increase-maxes-help',
        listeners:{
            painted:function () {
                biglifts.stores.lifts.Lifts.filter('enabled', true);
                this.rebuildFieldsets();
                biglifts.navigation.setBackFunction(Ext.bind(this.closeIncreaseMaxesHelpScreen, this));
            }
        }
    }
});