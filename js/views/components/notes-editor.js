Ext.ns('wendler.views.log.cards', 'wendler.components.notesEditor');

wendler.components.notesEditor.returnFromNotesEditor = function (notesEditor) {
    var notes = notesEditor.down('[name=notes]').getValue();
    notesEditor._returnCallback(notes);
};

wendler.components.notesEditor.sanitizeForDisplay = function (notes) {
    var displayableNotes = Ext.util.Format.htmlEncode(notes);
    displayableNotes = displayableNotes.replace(/\n/g, '<br/>');
    return displayableNotes;
};

Ext.define('Wendler.views.log.cards.NotesEditor', {
    extend:'Ext.Panel',
    xtype:'noteseditor',
    _returnCallback:function (notes) {
    },
    _setNotes:function (notes) {
        this.down('[name=notes]').setValue(notes);
    },
    config:{
        layout:'fit',
        listeners:{
            show:function (c) {
                wendler.navigation.setBackFunction(function () {
                    wendler.components.notesEditor.returnFromNotesEditor(c);
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
                            wendler.components.notesEditor.returnFromNotesEditor(this.up('panel'));
                        }
                    }
                ]
            },
            {
                xtype:'formpanel',
                padding:0,
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
                                        var parentHeight = c.up('formpanel').element.getHeight(true);
                                        c.element.down('textarea').setHeight(parentHeight - 7);
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