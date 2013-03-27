(function () {
    var MODULE_NAME = "Meet Goals";
    module(MODULE_NAME);

    var lifts;
    var meetGoals;

    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            lifts = biglifts.stores.lifts.Lifts;
            lifts.removeAll();
            meetGoals = biglifts.stores.lifts.MeetGoals;
            meetGoals.removeAll();

            lifts.sync();
            meetGoals.sync();
        }
    });

    test("should sync to the available lifts, adding missing lifts and defaulting meetGoal to the one rep max", function () {
        lifts.add({propertyName: 'squat', max: 400});
        meetGoals.syncMeetGoalsToLifts();
        equal(meetGoals.getCount(), 1);
        equal(meetGoals.first().get('weight'), 400);
    });

    test("should not rewrite existing meet goals when syncing", function () {
        lifts.add({propertyName: 'squat', max: 400});
        lifts.sync();
        equal(meetGoals.getCount(), 0);
        meetGoals.add({propertyName: 'squat', weight: 450});
        meetGoals.sync();

        meetGoals.syncMeetGoalsToLifts();
        equal(meetGoals.first().get('weight'), 450);
    });

    test("should sync to the available lifts, removing missing lifts", function () {
        lifts.add({propertyName: 'squat'});
        meetGoals.add({propertyName: 'press'});
        meetGoals.syncMeetGoalsToLifts();
        equal(meetGoals.getCount(), 1);
    });

    test("should sync lifts when the lifts store is modified", function () {
        lifts.add({propertyName: 'squat'});
        equal(meetGoals.getCount(), 0);
        lifts.sync();

        meetGoals.syncMeetGoalsToLifts();
        equal(meetGoals.getCount(), 1);
    });
})();