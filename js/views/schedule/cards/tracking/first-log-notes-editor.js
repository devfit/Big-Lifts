Ext.ns('biglifts.liftSchedule.liftTracking');

biglifts.liftSchedule.liftTracking.returnFromEditNotes = function (notes) {
    Ext.getCmp('lift-schedule').setActiveItem('lift-tracking', {type:'slide', direction:'right'});
    Ext.get('first-log-notes').removeCls('tapped');
    biglifts.liftTracking.currentLiftNotes = notes;
};

Ext.define('biglifts.views.log.cards.FirstLogNotesEditor', {
    extend:'biglifts.views.log.cards.NotesEditor',
    xtype:'firstlognoteseditor',
    _returnCallback:biglifts.liftSchedule.liftTracking.returnFromEditNotes
});