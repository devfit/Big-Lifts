"use strict";
Ext.ns('util.email');

util.email.buildEmailLink = function (to, subject, body) {
    var link = "mailto:" + to;

    var params = {};
    if (typeof(subject) !== 'undefined') {
        params['subject'] = subject;
    }

    if (typeof(body) !== 'undefined') {
        params['body'] = body;
    }

    return Ext.urlAppend(link, Ext.urlEncode(params));
};