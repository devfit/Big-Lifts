//Fix list deselection bug
Ext.define('Ext.dataview.override', {
    override: 'Ext.dataview.DataView',
    onStoreUpdate: function (store, record, newIndex, oldIndex) {
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

//Fix selectRange in lists.
Ext.define('Ext.dataview.override', {
    override: 'Ext.dataview.DataView',
    selectRange: function (startRecord, endRecord, keepExisting) {
        var me = this,
            store = me.getStore(),
            records = [],
            tmp, i;

        if (me.getDisableSelection()) {
            return;
        }

        // swap values
        if (startRecord > endRecord) {
            tmp = endRecord;
            endRecord = startRecord;
            startRecord = tmp;
        }

        for (i = startRecord; i <= endRecord; i++) {
            records.push(store.getAt(i));
        }
        this.doMultiSelect(records, keepExisting);
    }
});

Ext.define('Ext.viewport.Override', {
    override: 'Ext.viewport.Default',
    onResize: function () {
        var oldWidth = this.windowWidth,
            oldHeight = this.windowHeight,
            width = this.getWindowWidth(),
            height = this.getWindowHeight(),
            currentOrientation = this.getOrientation(),
            newOrientation = this.determineOrientation();

        if (oldWidth !== width || oldHeight !== height || currentOrientation !== newOrientation) {
            this.fireOrientationChangeEvent(newOrientation, currentOrientation);
        }
    }
});