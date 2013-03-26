Ext.define('biglifts.views.CustomMovementArrangePanel', {
    extend: "biglifts.components.ArrangePanel",
    done: function () {
        this.getParent().showCustomMovement();
    }
});