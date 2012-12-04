Ext.ns('biglifts.logEntry');
biglifts.logEntry.returnFromEditAssistanceNotes = function (newNotes) {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('edit-assistance-log-entry'));
    Ext.getCmp('edit-assistance-log-entry').updateNotes(newNotes);
};

Ext.define('biglifts.views.log.cards.AssistanceLogNotesEditor', {
    extend:'biglifts.views.log.cards.NotesEditor',
    xtype:'assistancelognoteseditor',
    _returnCallback:biglifts.logEntry.returnFromEditAssistanceNotes
});