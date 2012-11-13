Ext.ns('biglifts.logEntry');
biglifts.logEntry.returnFromEditNotes = function (newNotes) {
    Ext.getCmp('log').setActiveItem('edit-log-entry', {type:'slide', direction:'right'});

    if (biglifts.logEntry.currentRecord) {
        biglifts.logEntry.currentRecord.set('notes', newNotes);
        biglifts.stores.LiftLog.sync();
    }

    biglifts.components.notesEditor.displayNotes('edit-log-notes', newNotes);
};

Ext.define('biglifts.views.log.cards.LogNotesEditor', {
    extend:'biglifts.views.log.cards.NotesEditor',
    xtype:'lognoteseditor',
    _returnCallback:biglifts.logEntry.returnFromEditNotes
});