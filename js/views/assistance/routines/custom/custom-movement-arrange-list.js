Ext.define('biglifts.views.CustomMovementArrangeList', {
    extend: "Ext.dataview.List",
    config: {
        itemTpl: new Ext.XTemplate("<table class='assistance-table'><tbody><tr>" +
            "<td width='100%'><span class='name'>{name}</b></td>" +
            "</tr></tbody></table>")
    }
});