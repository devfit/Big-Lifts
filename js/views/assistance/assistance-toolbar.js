"use strict";
Ext.define('biglifts.components.AssistanceToolbar', {
    extend:"Ext.Toolbar",
    config:{
        addAction:null,
        arrangeAction:null,
        docked:'bottom',
        cls:'unstyled-toolbar',
        listeners:{
            initialize:function () {
                var me = this;
                if (me.getAddAction()) {
                    me.add({
                        text:'Add...',
                        ui:'confirm',
                        handler:me.getAddAction()
                    });
                }

                if (me.getArrangeAction()) {
                    me.add({
                        xtype:'button',
                        text:'Arrange',
                        handler:me.getArrangeAction()
                    });
                }

                me.add({xtype:'spacer'});
                me.add(Ext.create('biglifts.components.SetCounter'));
            }
        }
    }
});