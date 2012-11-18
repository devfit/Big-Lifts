Ext.ns('biglifts.logEntry');
biglifts.logEntry.returnFromEditAssistanceNotes = function (newNotes) {
    Ext.getCmp('log').setActiveItem(Ext.getCmp('edit-assistance-log-entry'), {type:'slide', direction:'right'});

    biglifts.logEntry.currentAssistanceRecord.set('notes', newNotes);
    biglifts.stores.assistance.ActivityLog.sync();

    biglifts.components.notesEditor.displayNotes(Ext.getCmp('edit-assistance-log-entry'), newNotes);
};

Ext.define('biglifts.views.log.cards.AssistanceLogNotesEditor', {
    extend:'biglifts.views.log.cards.NotesEditor',
    xtype:'assistancelognoteseditor',
    _returnCallback:biglifts.logEntry.returnFromEditAssistanceNotes
});