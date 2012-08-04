Ext.ns('wendler.liftSchedule.liftTracking');

wendler.liftSchedule.liftTracking.returnFromEditNotes = function (notes) {
    Ext.getCmp('lift-schedule').setActiveItem('lift-tracking', {type:'slide', direction:'right'});
    Ext.get('first-log-notes').removeCls('tapped');
    wendler.liftTracking.currentLiftNotes = notes;
    wendler.liftSchedule.liftTracking.displayNotes(wendler.liftTracking.currentLiftNotes);
};

Ext.define('Wendler.views.log.cards.FirstLogNotesEditor', {
    extend:'Wendler.views.log.cards.NotesEditor',
    xtype:'firstlognoteseditor',
    _returnCallback:wendler.liftSchedule.liftTracking.returnFromEditNotes
});