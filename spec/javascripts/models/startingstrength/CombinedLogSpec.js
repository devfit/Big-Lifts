(function () {
    var MODULE_NAME = "Starting Strength combined workout logs";
    module(MODULE_NAME);

    var log;
    var combinedLog;
    var sort;

    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            log = reloadStore(emptyStore(biglifts.stores.ss.Log));
            combinedLog = reloadStore(emptyStore(biglifts.stores.ss.CombinedLog));
            sort = reloadStore(emptyStore(biglifts.stores.LogSort));
            equal(sort.getCount(), 1);
        }
    });

    test("should convert an existing log into grouped combined entries", function () {
        log.add({workout_id: 1, name: '1'});
        log.add({workout_id: 1, name: '2'});
        log.add({workout_id: 2, name: '3'});
        combinedLog.rebuildCombinedStore();

        equal(combinedLog.getCount(), 2);
        var workout_1_logs = JSON.parse(combinedLog.findRecord('workout_id', 1).get('logs'));
        equal(workout_1_logs.length, 2);
        var workout_2_logs = JSON.parse(combinedLog.findRecord('workout_id', 2).get('logs'));
        equal(workout_2_logs.length, 1);
    });

    test("should sort based on the log sort preference", function () {
        log.add({workout_id: 1, name: '1', timestamp: 0});
        log.add({workout_id: 1, name: '2', timestamp: 1});
        log.add({workout_id: 2, name: '3', timestamp: 2});
        combinedLog.rebuildCombinedStore();

        sort.first().set({property: 'timestamp', ascending: false});
        sort.sync();
        combinedLog.sortBySaved();

        equal(combinedLog.first().get('workout_id'), 2);
    });

    test("should not sort if the sort property is name", function () {
        log.add({workout_id: 1, name: '1', timestamp: 0});
        log.add({workout_id: 1, name: '2', timestamp: 1});
        log.add({workout_id: 2, name: '3', timestamp: 2});
        combinedLog.rebuildCombinedStore();

        sort.first().set({property: 'timestamp', ascending: true});
        sort.sync();
        combinedLog.sortBySaved();

        sort.first().set({property: 'name', ascending: true});
        sort.sync();
        combinedLog.sortBySaved();

        equal(combinedLog.first().get('workout_id'), 1);
    });
})();