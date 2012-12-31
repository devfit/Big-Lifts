describe("Starting Strength combined workout logs", function () {
    beforeEach(function () {
        this.log = biglifts.stores.ss.Log;
        this.combinedLog = biglifts.stores.ss.CombinedLog;
        this.sort = biglifts.stores.LogSort;
        reloadStore(this.log);
        reloadStore(this.sort);
        reloadStore(this.combinedLog);
        expect(this.sort.getCount()).toEqual(1);
    });

    describe("rebuildCombinedStore", function () {
        it("should convert an existing log into grouped combined entries", function () {
            this.log.add({workout_id: 1, name: '1'});
            this.log.add({workout_id: 1, name: '2'});
            this.log.add({workout_id: 2, name: '3'});
            this.combinedLog.rebuildCombinedStore();

            expect(this.combinedLog.getCount()).toEqual(2);
            expect(this.combinedLog.findRecord('workout_id', 1).logs().getCount()).toEqual(2);
            expect(this.combinedLog.findRecord('workout_id', 2).logs().getCount()).toEqual(1);
        });
    });

    it("should sort based on the log sort preference", function () {
        this.log.add({workout_id: 1, name: '1', timestamp: 0});
        this.log.add({workout_id: 1, name: '2', timestamp: 1});
        this.log.add({workout_id: 2, name: '3', timestamp: 2});
        this.combinedLog.rebuildCombinedStore();

        this.sort.first().set({property: 'timestamp', ascending: false});
        this.sort.sync();
        this.combinedLog.sortBySaved();

        expect(this.combinedLog.first().get('workout_id')).toEqual(2);
    });

    it("should not sort if the sort property is name", function () {
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

        expect(this.combinedLog.first().get('workout_id')).toEqual(1);
    });
});