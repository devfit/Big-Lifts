Ext.ns('Wendler.views.assistance', 'wendler.liftSchedule.assistance.boringButBig');

wendler.liftSchedule.assistance.boringButBig.currentNotes = "";
wendler.liftSchedule.assistance.boringButBig.returnToBoringButBig = function (notes) {
    wendler.liftSchedule.assistance.boringButBig.currentNotes = notes;
    Ext.getCmp('lift-schedule').setActiveItem(Ext.getCmp('boring-but-big-log'));
    wendler.components.notesEditor.displayNotes('bbb-log-notes', notes);
};

Ext.define('Wendler.views.assistance.BoringButBigNotes', {
    extend:'Wendler.views.log.cards.NotesEditor',
    xtype:'boringbutbignotes',
    _returnCallback:wendler.liftSchedule.assistance.boringButBig.returnToBoringButBig,
    listeners:{
        show:function () {
            this._setNotes(wendler.liftSchedule.assistance.boringButBig.currentNotes);
        }
    }
});