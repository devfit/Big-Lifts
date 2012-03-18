wendler.controller.liftTracking.returnFromEditNotes = function (notes) {
    Ext.getCmp('lift-schedule').setActiveItem('lift-tracking', {type:'slide', direction:'right'});
    Ext.get('first-log-notes').removeCls('tapped');
    wendler.controller.liftTracking.currentLiftNotes = notes;
    wendler.controller.liftTracking.displayNotes(wendler.controller.liftTracking.currentLiftNotes);
};

Ext.define('Wendler.views.log.cards.FirstLogNotesEditor', {
    extend:'Wendler.views.log.cards.NotesEditor',
    xtype:'firstlognoteseditor',
    _returnCallback:wendler.controller.liftTracking.returnFromEditNotes
});