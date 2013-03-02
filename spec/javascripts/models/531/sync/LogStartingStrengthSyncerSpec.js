describe("Log StartingStrength Syncer", function () {
    beforeEach(function () {
        this.log = emptyStore(reloadStore(biglifts.stores.ss.Log));
        this.combinedLog = emptyStore(reloadStore(biglifts.stores.ss.CombinedLog));
        this.users = emptyStore(reloadStore(biglifts.stores.Users));
        this.syncer = Ext.create('biglifts.models.LogStartingStrengthSyncer');
    });

    it("should convert the StartingStrength log into post ready format", function () {
        var timestamp = new Date().getTime();
        this.log.add({name: 'Power Clean', weight: 200, sets: 5, reps: 3, units: 'lbs', timestamp: timestamp, workout_id: 1});
        this.log.add({name: 'Squat', weight: 300, sets: 3, reps: 5, units: 'lbs', timestamp: timestamp, workout_id: 1});
        this.log.sync();

        expect(this.combinedLog.getCount()).toEqual(1);

        var expected = [
            {
                workout_id: 1,
                name: 'StartingStrength',
                logs: [
                    {
                        name: 'Power Clean',
                        weight: 200,
                        sets: 5,
                        reps: 3,
                        units: 'lbs',
                        date: timestamp
                    },
                    {
                        name: 'Squat',
                        weight: 300,
                        sets: 3,
                        reps: 5,
                        units: 'lbs',
                        date: timestamp
                    }
                ]
            }
        ];
        expect(this.syncer.getFormattedLog()).toEqual(expected);
    });

    it("should not merge logs with colliding dates", function () {
        var now = new Date().getTime();
        var localLog = [
            {
                sets: 5,
                reps: 3,
                name: 'Power Clean',
                weight: 200,
                units: 'lbs',
                date: now
            },
            {
                sets: 3,
                reps: 5,
                name: 'Squat',
                weight: 300,
                units: 'lbs',
                date: now
            }
        ];

        this.log.add(localLog);
        this.log.sync();

        var remoteLog = {workout_id: 1, name: '5/3/1', logs: [
            {
                sets: 3,
                reps: 5,
                name: 'Press',
                weight: 100,
                units: 'lbs',
                date: now
            }
        ]};


        this.syncer.mergeRemoteLogs([
            remoteLog
        ]);

        expect(this.log.getCount()).toEqual(2);
        expect(this.combinedLog.getCount()).toEqual(1);
    });

    it("should merge logs with non colliding dates", function () {
        var now = new Date().getTime();
        var yesterday = (1).days().ago();

        var localLog = [
            {
                sets: 5,
                reps: 3,
                name: 'Power Clean',
                weight: 200,
                units: 'lbs',
                date: now
            },
            {
                sets: 3,
                reps: 5,
                name: 'Squat',
                weight: 300,
                units: 'lbs',
                date: now
            }
        ];

        this.log.add(localLog);
        this.log.sync();

        var remoteLog = {workout_id: 1, name: 'StartingStrength', logs: [
            {
                sets: 3,
                reps: 5,
                name: 'Press',
                weight: 100,
                units: 'lbs',
                date: yesterday
            }
        ]};


        this.syncer.mergeRemoteLogs([
            remoteLog
        ]);

        expect(this.log.getCount()).toEqual(3);
        expect(this.combinedLog.getCount()).toEqual(2);
    });
});