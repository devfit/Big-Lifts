"use strict";
Ext.ns("biglifts");
biglifts.premium = true;
if (location.href.indexOf('premium=true') !== -1) {
    biglifts.premium = true;
}
