Ext.define('biglifts.stores.AbstractSettingsStore', {
    extend: "Ext.data.Store",
    hasField: function (field) {
        var fieldNames = [];
        Ext.ModelManager.getModel(this.getModel()).getFields().each(function (f) {
            fieldNames.push(f.getName());
        });

        return _.indexOf(fieldNames, field) !== -1;
    }
});