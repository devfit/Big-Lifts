describe("Log Syncer", function () {
    beforeEach(function () {
        this.log = emptyStore(reloadStore(biglifts.stores.LiftLog));
        this.users = emptyStore(reloadStore(biglifts.stores.Users));
        this.syncer = Ext.create('biglifts.models.Log531Syncer');
    });

    it("should convert the 5/3/1 log into post ready format", function () {
        var timestamp = new Date().getTime();
        this.log.add({workout_id: 1, reps: 2, liftName: 'Squat', weight: 100, timestamp: timestamp, cycle: 3, expectedReps: 5, week: 1});
        this.log.sync();

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
        expect(this.syncer.getFormattedLog()).toEqual(expected);
    });

    it("should not merge logs with colliding dates and same name", function () {
        var now = new Date().getTime();
        var localLog = {workout_id: 1, reps: 2, liftName: 'Squat', weight: 100, timestamp: now, cycle: 3, expectedReps: 5, week: 1};

        var remoteLog = {workout_id: 1, name: '5/3/1', logs: [
            {reps: 2, name: 'Squat', weight: 90, date: now, sets: 1, specific_workout: {
                cycle: 5, week: 3, expected_reps: 1
            }}
        ]};

        this.log.add(localLog);
        this.log.sync();
        this.syncer.mergeRemoteLogs([
            remoteLog
        ]);

        expect(this.log.getCount()).toEqual(1);
    });

    it("should merge logs with colliding dates and different name", function () {
        var now = new Date().getTime();
        var localLog = {workout_id: 1, reps: 2, liftName: 'Squat', weight: 100, timestamp: now, cycle: 3, expectedReps: 5, week: 1};

        var remoteLog = {workout_id: 1, name: '5/3/1', logs: [
            {reps: 2, name: 'Press', weight: 90, date: now, sets: 1, specific_workout: {
                cycle: 5, week: 3, expected_reps: 1
            }}
        ]};

        this.log.add(localLog);
        this.log.sync();
        this.syncer.mergeRemoteLogs([
            remoteLog
        ]);

        expect(this.log.getCount()).toEqual(2);
    });

    it("should merge non date colliding logs with local logs", function () {
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

        this.log.add(localLog);
        this.log.sync();
        this.syncer.mergeRemoteLogs([
            remoteLog
        ]);

        expect(this.log.getCount()).toEqual(2);
        var newRecord = this.log.findRecord('workout_id', 2);
        expect(newRecord.get('weight')).toEqual(90);
        expect(newRecord.get('liftName')).toEqual('Squat');
        expect(newRecord.get('reps')).toEqual(reps);
        expect(newRecord.get('cycle')).toEqual(cycle);
        expect(newRecord.get('week')).toEqual(week);
        expect(newRecord.get('expectedReps')).toEqual(expectedReps);
        expect(newRecord.get('timestamp')).toEqual(yesterday.getTime());
    });

    it("should not merge non 5/3/1 logs", function () {
        var now = new Date().getTime();
        var yesterday = (1).days().ago();
        var localLog = {workout_id: 1, reps: 2, liftName: 'Squat', weight: 100, timestamp: now, cycle: 3, expectedReps: 5, week: 1};

        var remoteLog = {workout_id: 1, name: 'StartingStrength', logs: [
            {reps: 2, name: 'Squat', weight: 90, date: yesterday.getTime(), sets: 1, specific_workout: {
                cycle: 5, week: 3, expected_reps: 1
            }}
        ]};

        this.log.add(localLog);
        this.log.sync();
        this.syncer.mergeRemoteLogs([
            remoteLog
        ]);

        expect(this.log.getCount()).toEqual(1);
    });
});