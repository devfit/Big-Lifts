(function () {
    var MODULE_NAME = "Starting Strength template switcher";
    module(MODULE_NAME);
    var lifts;
    var workouts;
    QUnit.testStart(function (details) {
        if (details.module == MODULE_NAME) {
            reloadStore(emptyStore(biglifts.stores.GlobalSettings));
            lifts = reloadStore(biglifts.stores.ss.Lifts);
            workouts = reloadStore(biglifts.stores.ss.WorkoutStore);
        }
    });

    var getCurrentRecords = function () {
        var currentRecords = {};
        lifts.each(function (l) {
            currentRecords[l.get('name')] = l.get('id');
        });

        return currentRecords;
    };

    var assertExistingLiftsAreTheSame = function (previousRecords) {
        lifts.each(function (l) {
            if (previousRecords[l.get('name')]) {
                equal(lifts.findRecord('name', l.get('name')).get('id'), previousRecords[l.get('name')]);
            }
        });
    };

    test("should switch set lifts to novice entries, leaving existing entries", function () {
        var previousRecords = getCurrentRecords();
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Novice');

        equal(lifts.getCount(), 4);
        assertExistingLiftsAreTheSame(previousRecords);
    });

    test("should switch set lifts to standard entries, adding needed entries", function () {
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Novice');

        var previousRecords = getCurrentRecords();
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Standard');

        equal(lifts.getCount(), 5);
        assertExistingLiftsAreTheSame(previousRecords);
    });

    test("should set workouts to match the novice template", function () {
        var templateSwitcher = Ext.create('biglifts.models.startingstrength.TemplateSwitcher');
        templateSwitcher.switchTo('Standard');
        templateSwitcher.switchTo('Novice');

        var deadlift = lifts.findRecord('name', 'Deadlift');
        workouts.filter('lift_id', deadlift.get('id'));
        workouts.filter('warmup', false);
        equal(workouts.getCount(), 2);
    });
})();