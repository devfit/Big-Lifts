wendler.controller.logEntry.returnFromEditNotes = function (newNotes) {
    Ext.getCmp('log').setActiveItem('edit-log-entry', {type:'slide', direction:'right'});

    if( wendler.controller.logEntry.currentRecord ){
        wendler.controller.logEntry.currentRecord.set('notes', newNotes);

        wendler.controller.logEntry.currentRecord.save();
        wendler.stores.LiftLog.sync();
    }

    wendler.controller.logEntry.displayNotes(newNotes);
};

Ext.define('Wendler.views.log.cards.LogNotesEditor', {
    extend:'Wendler.views.log.cards.NotesEditor',
    xtype:'lognoteseditor',
    _returnCallback:wendler.controller.logEntry.returnFromEditNotes
});