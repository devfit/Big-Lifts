"use strict";
Ext.ns("biglifts");
biglifts.premium = false;
if (location.href.indexOf('premium=true') !== -1) {
    biglifts.premium = true;
}
