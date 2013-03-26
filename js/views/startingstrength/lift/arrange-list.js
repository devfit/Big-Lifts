Ext.define('biglifts.views.ss.ArrangeList', {
    extend: "Ext.dataview.List",
    config: {
        listeners: {
            initialize: function () {
                this.setItemTpl(new Ext.XTemplate("{[this.getLiftName(values.lift_id)]}", {
                    getLiftName: function (lift_id) {
                        return biglifts.stores.ss.Lifts.findRecord('id', lift_id).get('name');
                    }
                }));
            }
        }
    }
});