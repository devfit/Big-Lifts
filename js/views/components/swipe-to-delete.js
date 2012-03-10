Ext.ns('wendler.components.swipeToDelete');

wendler.components.addSwipeToDelete = function (list, tapAction, deleteAction, selectorInListToHideWhileDeleteIsShown) {
    list.addCls('list-swipe-to-delete');
    list.addListener('itemtap', function (dataview, index, target, record, e) {
        wendler.components.swipeToDelete.itemTapWrapper(dataview, index, target, e, tapAction, deleteAction, selectorInListToHideWhileDeleteIsShown);
    });
    list.addListener('itemswipe', function (dataview, index, target, record, e) {
        wendler.components.swipeToDelete.itemSwipeWrapper(target, e, selectorInListToHideWhileDeleteIsShown);
    })
};

wendler.components.swipeToDelete.itemTapWrapper = function (dataview, index, item, e, tapAction, deleteAction, selectorInListToHideWhileDeleteIsShown) {
    var tapTarget = Ext.get(e.target);
    var rowWithDelete = wendler.components.swipeToDelete.findRowWithDeleteButtonFromTapTarget(tapTarget);
    if (wendler.components.swipeToDelete.tappingDelete(tapTarget)) {
        deleteAction(dataview, index, item, e);
    }
    else if (rowWithDelete !== null) {
        wendler.components.swipeToDelete.showHideDeleteButton(rowWithDelete, selectorInListToHideWhileDeleteIsShown);
    }
    else {
        tapAction(dataview, index, item, e);
    }
};

wendler.components.swipeToDelete.itemSwipeWrapper = function (item, e, selectorInListToHideWhileDeleteIsShown) {
    var tapTarget = Ext.get(e.target);
    var rowWithDelete = wendler.components.swipeToDelete.findRowWithDeleteButton(tapTarget);
    if (rowWithDelete !== null) {
        wendler.components.swipeToDelete.showHideDeleteButton(rowWithDelete, selectorInListToHideWhileDeleteIsShown);
    }
    else {
        wendler.components.swipeToDelete.showHideDeleteButton(item, selectorInListToHideWhileDeleteIsShown);
    }
};

wendler.components.swipeToDelete.findRowWithDeleteButtonFromTapTarget = function (tapTarget) {
    var list = tapTarget.up('.list-swipe-to-delete');
    var deleteContainers = list.query('.delete-button-holder');
    for (var i = 0; i < deleteContainers.length; i++) {
        var deleteContainer = deleteContainers[i];
        if (!Ext.get(deleteContainer).hasCls('hidden')) {
            return Ext.get(deleteContainer).up('.x-list-item');
        }
    }
    return null;
};

wendler.components.swipeToDelete.tappingDelete = function (tapTarget) {
    return tapTarget.hasCls('delete-button') || tapTarget.up('.delete-button') !== null;
};

wendler.components.swipeToDelete.showHideDeleteButton = function (row, selectorInListToHideWhileDeleteIsShown) {
    var thingToHideWhileDeleting = Ext.get(row).down(selectorInListToHideWhileDeleteIsShown);
    var deleteButton = Ext.get(row).down('.delete-button-holder');
    if (thingToHideWhileDeleting.hasCls('hidden')) {
        thingToHideWhileDeleting.removeCls('hidden');
        deleteButton.addCls('hidden');
    }
    else if (deleteButton.hasCls('hidden')) {
        wendler.components.swipeToDelete.showDeleteButtonForDom(deleteButton);
        thingToHideWhileDeleting.addCls('hidden');
    }
};

wendler.components.swipeToDelete.showDeleteButtonForDom = function (container) {
    container.removeCls('hidden');
    container.addCls('fade-in');

    if (container.down('.delete-button') === null) {
        new Ext.Button({
            cls:'delete-button',
            ui:'decline',
            text:'Delete',
            renderTo:container
        });
    }
};
