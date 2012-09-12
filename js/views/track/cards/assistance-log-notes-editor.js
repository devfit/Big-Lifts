Ext.ns('wendler.logEntry');
wendler.logEntry.returnFromEditAssistanceNotes = function (newNotes) {
    Ext.getCmp('log').setActiveItem('edit-assistance-log-entry', {type:'slide', direction:'right'});

    wendler.logEntry.currentAssistanceRecord.set('notes', newNotes);
    wendler.logEntry.currentAssistanceRecord.save();
    wendler.stores.assistance.ActivityLog.sync();

    wendler.components.notesEditor.displayNotes('edit-assistance-log-notes', newNotes);
};

Ext.define('Wendler.views.log.cards.AssistanceLogNotesEditor', {
    extend:'Wendler.views.log.cards.NotesEditor',
    xtype:'assistancelognoteseditor',
    _returnCallback:wendler.logEntry.returnFromEditAssistanceNotes
});