describe("Starting Strength template switcher", function () {
    beforeEach(function () {
        ensureLoaded(biglifts.stores.GlobalSettings);
        expect(biglifts.stores.GlobalSettings.getCount(),1);
        this.lifts = reloadStore(biglifts.stores.ss.Lifts);
        this.workouts = reloadStore(biglifts.stores.ss.WorkoutStore);
    });

    var getCurrentRecords = function (me) {
        var currentRecords = {};
        me.lifts.each(function (l) {
            currentRecords[l.get('name')] = l.get('id');
        });

        return currentRecords;
    };

    var assertExistingLiftsAreTheSame = function (me, previousRecords) {
        me.lifts.each(function (l) {
            if (previousRecords[l.get('name')]) {
                expect(me.lifts.findRecord('name', l.get('name')).get('id'),previousRecords[l.get('name')]);
            }
        });
    };

    test("should switch set lifts to novice entries, leaving existing entries", function () {
        var previousRecords = getCurrentRecords(this);
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Novice');

        expect(this.lifts.getCount(),4);
        assertExistingLiftsAreTheSame(this, previousRecords);
    });

    test("should switch set lifts to standard entries, adding needed entries", function () {
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Novice');

        var previousRecords = getCurrentRecords(this);
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Standard');

        expect(this.lifts.getCount(),5);
        assertExistingLiftsAreTheSame(this, previousRecords);
    });

    test("should set workouts to match the novice template", function () {
        var templateSwitcher = Ext.create('biglifts.models.startingstrength.TemplateSwitcher');
        templateSwitcher.switchTo('Standard');
        templateSwitcher.switchTo('Novice');

        var deadlift = this.lifts.findRecord('name', 'Deadlift');
        this.workouts.filter('lift_id', deadlift.get('id'));
        this.workouts.filter('warmup', false);
        expect(this.workouts.getCount(),2);
    });
});
