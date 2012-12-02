Ext.ns('biglifts.views.log.cards', 'biglifts.components.notesEditor');

biglifts.components.notesEditor.returnFromNotesEditor = function (notesEditor) {
    var notes = notesEditor.down('[name=notes]').getValue();
    notesEditor._returnCallback(notes);
};

biglifts.components.notesEditor.displayNotes = function (contentId, notes) {
    var displayableNotes = null;
    if (notes === "") {
        displayableNotes = "<div class='notes-empty-text'>Tap to edit</div>";
    }
    else {
        displayableNotes = biglifts.components.notesEditor.sanitizeForDisplay(notes);
    }
    if (Ext.get(contentId)) {
        Ext.get(contentId).setHtml(displayableNotes);
    }
};

biglifts.components.notesEditor.sanitizeForDisplay = function (notes) {
    var displayableNotes = Ext.util.Format.htmlEncode(notes);
    displayableNotes = displayableNotes.replace(/\n/g, '<br/>');
    return displayableNotes;
};

Ext.define('biglifts.views.log.cards.NotesEditor', {
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
            painted:function (c) {
                biglifts.navigation.setBackFunction(function () {
                    biglifts.components.notesEditor.returnFromNotesEditor(c);
                });
            },
            initialize:function () {
                var me = this;
                me.add({
                    docked:'top',
                    xtype:'toolbar',
                    title:'Notes',
                    items:[
                        {
                            text:'Back',
                            ui:'back',
                            handler:function () {
                                biglifts.components.notesEditor.returnFromNotesEditor(this.up('panel'));
                            }
                        }
                    ]
                });
                me.formPanel = me.add({
                    xtype:'formpanel',
                    padding:0,
                    bodyPadding:'5px'
                });

                var fieldSet = me.formPanel.add({
                    xtype:'fieldset',
                    cls:'notes-form'
                });

                me.textAreaField = fieldSet.add({
                    xtype:'textareafield',
                    name:'notes',
                    listeners:{
                        painted:function (c) {
                            var parentHeight = me.formPanel.element.getHeight(true);
                            me.textAreaField.setHeight(parentHeight - 7);
                        }
                    }
                });
            }
        }
    }
});