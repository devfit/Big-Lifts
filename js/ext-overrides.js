//Fix list deselection bug
Ext.define('Ext.dataview.override', {
    override:'Ext.dataview.DataView',
    onStoreUpdate:function (store, record, newIndex, oldIndex) {
        var me = this,
            container = me.container;
        oldIndex = (typeof oldIndex === 'undefined') ? newIndex : oldIndex;

        if (oldIndex !== newIndex) {
            container.moveItemsToCache(oldIndex, oldIndex);
            container.moveItemsFromCache([record]);
            if (me.isSelected(record)) {
                me.doItemSelect(me, record);
            }
        }
        else {
            container.updateListItem(record, container.getViewItems()[newIndex]);
        }
    }
});