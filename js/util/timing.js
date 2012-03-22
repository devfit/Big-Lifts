Ext.ns('util');
util.time = function (c, description) {
    description = typeof(description) === "undefined" ? "" : description;
    var now = new Date();
    c.call();
    console.log(description + ": " + (new Date().getTime() - now.getTime()) + "ms");
};