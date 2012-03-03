"use strict";
Ext.ns("wendler.data");

wendler.data.disasterRecovery = function(){
    wendler.stores.recovery.setupDefaultCurrentCycle();
    wendler.stores.recovery.setupDefaultLifts();
    wendler.stores.migrations.liftCompletionMigration();
    wendler.stores.recovery.setupDefaultLiftProgressions();
    wendler.stores.recovery.setupDefaultSettings();
};