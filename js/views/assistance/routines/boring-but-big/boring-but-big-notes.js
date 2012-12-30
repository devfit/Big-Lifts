Ext.define('biglifts.views.assistance.BoringButBigNotes', {
    extend: 'biglifts.views.log.cards.NotesEditor',
    xtype: 'boringbutbignotes',
    _returnCallback: function (notes) {
        Ext.getCmp('boring-but-big-panel').currentNotes = notes;
        Ext.getCmp('assistance').setActiveItem(Ext.getCmp('boring-but-big'));
        biglifts.components.notesEditor.displayNotes('bbb-log-notes', notes);
    },
    listeners: {
        painted: function () {
            var me = this;
            biglifts.navigation.setBackFunction(function () {
                me._returnCallback(me.getNotes());
            });
            this._setNotes(Ext.getCmp('boring-but-big-panel').currentNotes);
        }
    }
});