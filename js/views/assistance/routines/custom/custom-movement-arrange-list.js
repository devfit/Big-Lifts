Ext.define('biglifts.views.CustomMovementArrangeList', {
    extend: "Ext.dataview.List",
    config: {
        listeners: {
            initialize: function () {
                var list = this;
                list.setItemTpl(new Ext.XTemplate("<table class='assistance-table'><tbody><tr>" +
                    "<td width='100%'><span class='name'>{[this.getNameFromValues(values)]}</b></td>" +
                    "</tr></tbody></table>", {
                    getNameFromValues: function (r) {
                        if (list.getStore().getNameForRecord) {
                            return list.getStore().getNameForRecord(r);
                        }
                        else {
                            return r.name;
                        }
                    }
                }));
            }
        }
    }
});