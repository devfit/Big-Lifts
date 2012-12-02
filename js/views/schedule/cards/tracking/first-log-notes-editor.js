Ext.ns('biglifts.liftSchedule.liftTracking');

biglifts.liftSchedule.liftTracking.returnFromEditNotes = function (notes) {
    var liftTracking = Ext.getCmp('lift-tracking');
    Ext.getCmp('lift-schedule').setActiveItem(liftTracking);
    liftTracking.setNotes(notes);
};

Ext.define('biglifts.views.log.cards.FirstLogNotesEditor', {
    extend:'biglifts.views.log.cards.NotesEditor',
    xtype:'firstlognoteseditor',
    _returnCallback:biglifts.liftSchedule.liftTracking.returnFromEditNotes
});