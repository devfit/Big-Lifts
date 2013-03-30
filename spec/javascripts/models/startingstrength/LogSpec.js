(function () {
    var MODULE_NAME = "Starting Strength log";
    module(MODULE_NAME);
    var log;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            log = emptyStore(reloadStore(biglifts.stores.ss.Log));
        }
    });

    test("should return 0 if there are no log entries", function () {
        equal(log.getNewWorkoutId(), 0);
    });

    test("should return 1 if there is a log entry with a 0 id", function () {
        log.add({workout_id: 0});
        log.sync();
        equal(log.getNewWorkoutId(), 1);
    });
    test("should remove duplicates and return the set of unique workoutIds", function () {
        log.add({workout_id: 1, name: 'Squat'});
        log.add({workout_id: 1, name: 'Press'});
        log.sync();
        deepEqual(log.getUniqueWorkoutIdsFromModels([log.first(), log.last()]), [1]);
    });

    test("should return 1 if there is a log entry with a 0 id", function () {
        log.add({workout_id: 0});
        log.sync();
        equal(log.getNewWorkoutId(), 1);
    });
})();