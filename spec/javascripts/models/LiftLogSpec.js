(function () {
    var MODULE_NAME = "The lift log store";
    module(MODULE_NAME);

    var liftLog;
    var currentCycle;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            liftLog = emptyStore(reloadStore(biglifts.stores.LiftLog));
            currentCycle = reloadStore(emptyStore(biglifts.stores.CurrentCycle));
        }
    });

    test("should return sort by date secondarily if sorting A-Z", function () {
        liftLog.add({liftName: 'Squat', timestamp: 1000});
        liftLog.add({liftName: 'Squat', timestamp: 3000});
        liftLog.add({liftName: 'Squat', timestamp: 4000});
        liftLog.add({liftName: 'Squat', timestamp: 2000});
        liftLog.add({liftName: 'Press', timestamp: 1500});

        liftLog.sortLog('liftName', 'ASC');

        equal(liftLog.getAt(0).get('liftName'), "Press");
        equal(liftLog.getAt(1).get('timestamp'), 4000);
        equal(liftLog.getAt(2).get('timestamp'), 3000);
        equal(liftLog.getAt(3).get('timestamp'), 2000);
        equal(liftLog.getAt(4).get('timestamp'), 1000);
    });

    test("should add workout ids with add", function () {
        liftLog.addLogEntry({liftName: 'Squat'});
        equal(liftLog.findRecord('liftName', 'Squat').get('workout_id'), 1);
        liftLog.addLogEntry({liftName: 'Press'});
        equal(liftLog.findRecord('liftName', 'Press').get('workout_id'), 2);
    });

    test("should restitch workout ids when log entries are removed", function () {
        liftLog.addLogEntry({liftName: 'Squat'});
        liftLog.addLogEntry({liftName: 'Press'});
        liftLog.addLogEntry({liftName: 'Deadlift'});
        liftLog.remove(liftLog.findRecord('liftName', 'Press'));
        equal(liftLog.findRecord('liftName', 'Deadlift').get('workout_id'), 2);
    });

    test("should clear lift_completion_ids on cycle change", function () {
        liftLog.addLogEntry({liftName: 'Squat', lift_completion_id: '1'});
        currentCycle.first().set('cycle', 2);
//        currentCycle.first().save();
        currentCycle.sync();

        equal(liftLog.first().get('lift_completion_id'), null);
    });
})();