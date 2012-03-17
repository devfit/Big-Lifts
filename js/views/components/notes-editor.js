Ext.ns('wendler.views.log.cards', 'wendler.controller.components.notesEditor');

wendler.controller.components.notesEditor.returnFromNotesEditor = function (notesEditor) {
    var notes = notesEditor.down('[name=notes]').getValue();
    notesEditor._returnCallback(notes);
};

wendler.controller.components.notesEditor.sanitizeForDisplay = function (notes) {
    var displayableNotes = Ext.util.Format.htmlEncode(notes);
    displayableNotes = displayableNotes.replace(/\n/g, '<br/>');
    return displayableNotes;
};

Ext.define('Wendler.views.log.cards.NotesEditor', {
    extend:'Ext.Panel',
    _returnCallback:function (notes) {
    },
    _setNotes:function (notes) {
//        this.down('[name=notes]').setValue(notes);
    },
    config:{
        layout:'fit',
        listeners:{
            show:function (c) {
                wendler.navigation.setBackFunction(function () {
                    wendler.controller.components.notesEditor.returnFromNotesEditor(c);
                });
            }
        },
        fullscreen:true,
        items:[
            {
                docked:'top',
                xtype:'toolbar',
                title:'Notes',
                items:[
                    {
                        text:'Back',
                        ui:'back',
                        handler:function () {
                            wendler.controller.components.notesEditor.returnFromNotesEditor(this.up('panel'));
                        }
                    }
                ]
            },
            {
                xtype:'formpanel',
                bodyPadding:'5px',
                items:[
                    {
                        xtype:'fieldset',
                        cls:'notes-form',
                        items:[
                            {
                                xtype:'textareafield',
                                name:'notes',
                                listeners:{
                                    painted:function (c) {
                                        var parentHeight = c.up('fieldset').getHeight();
                                        c.el.down('textarea').setHeight(parentHeight - 7);
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
});