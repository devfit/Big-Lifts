Ext.ns("util.components");
util.components.toggleVisibility = function (component) {
    if (component.isHidden()) {
        component.show();
    }
    else {
        component.hide();
    }
};