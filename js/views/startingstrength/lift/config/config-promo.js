Ext.define('biglifts.views.ss.ConfigPromo', {
    extend:"Ext.Container",
    constructor:function () {
        this.callParent(arguments);

        var html = "Big Lifts Pro currently supports the following configs:" +
            "\n<ul>" +
            "<li>» Pure Novice</li>" +
            "<li>» Regular</li>" +
            "</ul>";
        this.add({html:html});
    },
    config:{
        cls:'message'
    }
});