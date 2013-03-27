describe("Starting Strength combined workout logs", function () {
    beforeEach(function () {
        this.log = biglifts.stores.ss.Log;
        this.combinedLog = biglifts.stores.ss.CombinedLog;
        this.sort = biglifts.stores.LogSort;
        reloadStore(this.log);
        reloadStore(this.sort);
        reloadStore(this.combinedLog);
        expect(this.sort.getCount(),1);
    });

    describe("rebuildCombinedStore", function () {
        test("should convert an existing log into grouped combined entries", function () {
            this.log.add({workout_id: 1, name: '1'});
            this.log.add({workout_id: 1, name: '2'});
            this.log.add({workout_id: 2, name: '3'});
            this.combinedLog.rebuildCombinedStore();

            expect(this.combinedLog.getCount(),2);
            var workout_1_logs = JSON.parse(this.combinedLog.findRecord('workout_id', 1).get('logs'));
            expect(workout_1_logs.length,2);
            var workout_2_logs = JSON.parse(this.combinedLog.findRecord('workout_id', 2).get('logs'));
            expect(workout_2_logs.length,1);
        });
    });

    test("should sort based on the log sort preference", function () {
        this.log.add({workout_id: 1, name: '1', timestamp: 0});
        this.log.add({workout_id: 1, name: '2', timestamp: 1});
        this.log.add({workout_id: 2, name: '3', timestamp: 2});
        this.combinedLog.rebuildCombinedStore();

        this.sort.first().set({property: 'timestamp', ascending: false});
        this.sort.sync();
        this.combinedLog.sortBySaved();

        expect(this.combinedLog.first().get('workout_id'),2);
    });

    test("should not sort if the sort property is name", function () {
        this.log.add({workout_id: 1, name: '1', timestamp: 0});
        this.log.add({workout_id: 1, name: '2', timestamp: 1});
        this.log.add({workout_id: 2, name: '3', timestamp: 2});
        this.combinedLog.rebuildCombinedStore();

        this.sort.first().set({property: 'timestamp', ascending: true});
        this.sort.sync();
        this.combinedLog.sortBySaved();

        this.sort.first().set({property: 'name', ascending: true});
        this.sort.sync();
        this.combinedLog.sortBySaved();

        expect(this.combinedLog.first().get('workout_id'),1);
    });
});