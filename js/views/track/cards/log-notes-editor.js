Ext.ns('biglifts.logEntry');
biglifts.logEntry.returnFromEditNotes = function (newNotes) {
    var editLogEntry = Ext.getCmp('edit-log-entry');
    Ext.getCmp('log').setActiveItem(editLogEntry);
    editLogEntry.updateNotes(newNotes);
};

Ext.define('biglifts.views.log.cards.LogNotesEditor', {
    extend:'biglifts.views.log.cards.NotesEditor',
    xtype:'lognoteseditor',
    _returnCallback:biglifts.logEntry.returnFromEditNotes
});