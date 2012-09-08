Ext.ns('wendler.logEntry');
wendler.logEntry.returnFromEditNotes = function (newNotes) {
    Ext.getCmp('log').setActiveItem('edit-log-entry', {type:'slide', direction:'right'});

    if (wendler.logEntry.currentRecord) {
        wendler.logEntry.currentRecord.set('notes', newNotes);

        wendler.logEntry.currentRecord.save();
        wendler.stores.LiftLog.sync();
    }

    wendler.components.notesEditor.displayNotes('edit-log-notes', newNotes);
};

Ext.define('Wendler.views.log.cards.LogNotesEditor', {
    extend:'Wendler.views.log.cards.NotesEditor',
    xtype:'lognoteseditor',
    _returnCallback:wendler.logEntry.returnFromEditNotes
});