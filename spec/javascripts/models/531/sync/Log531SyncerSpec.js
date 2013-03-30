(function () {
    var MODULE_NAME = "Log 5/3/1 Syncer";
    module(MODULE_NAME);

    var log;
    var users;
    var syncer;

    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            log = emptyStore(reloadStore(biglifts.stores.LiftLog));
            users = emptyStore(reloadStore(biglifts.stores.Users));
            syncer = Ext.create('biglifts.models.Log531Syncer');
        }
    });

    test("should convert the 5/3/1 log into post ready format", function () {
        var timestamp = new Date().getTime();
        log.add({workout_id: 1, reps: 2, liftName: 'Squat', weight: 100, timestamp: timestamp, cycle: 3, expectedReps: 5, week: 1});
        log.sync();

        var expected = [
            {
                workout_id: 1,
                name: '5/3/1',
                logs: [
                    {
                        sets: 1,
                        reps: 2,
                        name: 'Squat',
                        weight: 100,
                        notes: '',
                        date: timestamp,
                        specific: {
                            type: '5/3/1',
                            data: {
                                cycle: 3,
                                expected_reps: 5,
                                week: 1
                            }
                        }
                    }
                ]
            }
        ];
        deepEqual(syncer.getFormattedLog(), expected);
    });

    test("should not merge logs with colliding dates and same name", function () {
        var now = new Date().getTime();
        var localLog = {workout_id: 1, reps: 2, liftName: 'Squat', weight: 100, timestamp: now, cycle: 3, expectedReps: 5, week: 1};

        var remoteLog = {workout_id: 1, name: '5/3/1', logs: [
            {reps: 2, name: 'Squat', weight: 90, date: now, sets: 1, specific_workout: {
                cycle: 5, week: 3, expected_reps: 1
            }}
        ]};

        log.add(localLog);
        log.sync();
        syncer.mergeRemoteLogs([
            remoteLog
        ]);

        equal(log.getCount(), 1);
    });

    test("should merge logs with colliding dates and different name", function () {
        var now = new Date().getTime();
        var localLog = {workout_id: 1, reps: 2, liftName: 'Squat', weight: 100, timestamp: now, cycle: 3, expectedReps: 5, week: 1};

        var remoteLog = {workout_id: 1, name: '5/3/1', logs: [
            {reps: 2, name: 'Press', weight: 90, date: now, sets: 1, specific_workout: {
                cycle: 5, week: 3, expected_reps: 1
            }}
        ]};

        log.add(localLog);
        log.sync();
        syncer.mergeRemoteLogs([
            remoteLog
        ]);

        equal(log.getCount(), 2);
    });

    test("should merge non date colliding logs with local logs", function () {
        var now = new Date().getTime();
        var yesterday = (1).days().ago();
        var localLog = {workout_id: 1, reps: 2, liftName: 'Squat', weight: 100, timestamp: now, cycle: 3, expectedReps: 5, week: 1};

        var cycle = 5;
        var reps = 2;
        var week = 3;
        var expectedReps = 1;
        var remoteLog = {workout_id: 1, name: '5/3/1', logs: [
            {reps: reps, name: 'Squat', weight: 90, date: yesterday.getTime(), sets: 1, specific_workout: {
                cycle: cycle, week: week, expected_reps: expectedReps
            }}
        ]};

        log.add(localLog);
        log.sync();
        syncer.mergeRemoteLogs([
            remoteLog
        ]);

        equal(log.getCount(), 2);
        var newRecord = log.findRecord('workout_id', 2);
        equal(newRecord.get('weight'), 90);
        equal(newRecord.get('liftName'), 'Squat');
        equal(newRecord.get('reps'), reps);
        equal(newRecord.get('cycle'), cycle);
        equal(newRecord.get('week'), week);
        equal(newRecord.get('expectedReps'), expectedReps);
        equal(newRecord.get('timestamp'), yesterday.getTime());
    });

    test("should not merge non 5/3/1 logs", function () {
        var now = new Date().getTime();
        var yesterday = (1).days().ago();
        var localLog = {workout_id: 1, reps: 2, liftName: 'Squat', weight: 100, timestamp: now, cycle: 3, expectedReps: 5, week: 1};

        var remoteLog = {workout_id: 1, name: 'StartingStrength', logs: [
            {reps: 2, name: 'Squat', weight: 90, date: yesterday.getTime(), sets: 1, specific_workout: {
                cycle: 5, week: 3, expected_reps: 1
            }}
        ]};

        log.add(localLog);
        log.sync();
        syncer.mergeRemoteLogs([
            remoteLog
        ]);

        equal(log.getCount(), 1);
    });
})();