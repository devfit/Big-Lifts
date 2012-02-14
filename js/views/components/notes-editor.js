Ext.ns('wendler.views.log.cards', 'wendler.controller.components.notesEditor');

wendler.controller.components.notesEditor.returnFromNotesEditor = function (notesEditor) {
    var notes = notesEditor.down('[name=notes]').getValue();
    notesEditor._returnCallback(notes);
};

wendler.controller.components.notesEditor.sanitizeForDisplay = function(notes){
    var displayableNotes = Ext.util.Format.htmlEncode(notes);
    displayableNotes = displayableNotes.replace(/\n/g, '<br/>');
    return displayableNotes;
};

wendler.views.log.cards.NotesEditor = Ext.extend(Ext.Panel, {
    _returnCallback:function (notes) {
    },
    _setNotes:function (notes) {
        this.down('[name=notes]').setValue(notes);
    },
    layout:'fit',
    listeners:{
        beforeshow:function (c) {
            wendler.navigation.setBackFunction(function () {
                wendler.controller.components.notesEditor.returnFromNotesEditor(c);
            });
        }
    },
    dockedItems:{
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
    fullscreen:true,
    items:[
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
                                afterrender:function (c) {
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
});