Ext.define('biglifts.models.startingstrength.TemplateSwitcher', {
    switchTo:function (template) {
        template = template.toLowerCase();
        var units = biglifts.stores.GlobalSettings.getUnits();
        var newLifts = biglifts.models.startingstrength.lifts[template][units];
        this.removeLiftsNotNeeded(newLifts);
        this.addNeededLifts(newLifts);
        biglifts.stores.ss.Lifts.sync();
    },
    removeLiftsNotNeeded:function (newLifts) {
        var newLiftNames = _.map(newLifts, function (value) {
            return value.name
        });

        util.withNoFilters(biglifts.stores.ss.Lifts, function () {
            biglifts.stores.ss.Lifts.filterBy(function (l) {
                return newLiftNames.indexOf(l.get('name')) === -1;
            });
            biglifts.stores.ss.Lifts.each(function (l) {
                biglifts.stores.ss.Lifts.remove(l);
            });
            biglifts.stores.ss.Lifts.clearFilter();
        });
    },
    addNeededLifts:function (newLifts) {
        util.withNoFilters(biglifts.stores.ss.Lifts, function () {
            _.each(newLifts, function (newLift) {
                if (!biglifts.stores.ss.Lifts.findRecord('name', newLift.name)) {
                    biglifts.stores.ss.Lifts.add(newLift);
                }
            });

            biglifts.stores.ss.Lifts.clearFilter();
        });
    }
});