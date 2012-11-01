Ext.ns('biglifts.views.assistance', 'biglifts.liftSchedule.assistance.boringButBig');

biglifts.liftSchedule.assistance.boringButBig.currentNotes = "";
biglifts.liftSchedule.assistance.boringButBig.returnToBoringButBig = function (notes) {
    biglifts.liftSchedule.assistance.boringButBig.currentNotes = notes;
    Ext.getCmp('assistance').setActiveItem(Ext.getCmp('boring-but-big'));
    biglifts.components.notesEditor.displayNotes('bbb-log-notes', notes);
};

Ext.define('biglifts.views.assistance.BoringButBigNotes', {
    extend:'biglifts.views.log.cards.NotesEditor',
    xtype:'boringbutbignotes',
    _returnCallback:biglifts.liftSchedule.assistance.boringButBig.returnToBoringButBig,
    listeners:{
        show:function () {
            biglifts.navigation.setBackFunction(biglifts.liftSchedule.assistance.boringButBig.returnToBoringButBig);
            this._setNotes(biglifts.liftSchedule.assistance.boringButBig.currentNotes);
        }
    }
});