Ext.ns('biglifts.logEntry');
biglifts.logEntry.returnFromEditAssistanceNotes = function (newNotes) {
    Ext.getCmp('log').setActiveItem('edit-assistance-log-entry', {type:'slide', direction:'right'});

    biglifts.logEntry.currentAssistanceRecord.set('notes', newNotes);
    biglifts.logEntry.currentAssistanceRecord.save();
    biglifts.stores.assistance.ActivityLog.sync();

    biglifts.components.notesEditor.displayNotes('edit-assistance-log-notes', newNotes);
};

Ext.define('biglifts.views.log.cards.AssistanceLogNotesEditor', {
    extend:'biglifts.views.log.cards.NotesEditor',
    xtype:'assistancelognoteseditor',
    _returnCallback:biglifts.logEntry.returnFromEditAssistanceNotes
});