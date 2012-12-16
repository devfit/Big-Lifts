describe("Starting Strength combined workout logs", function () {
    beforeEach(function () {
        localStorage.clear();
        this.combinedLog = biglifts.stores.ss.CombinedLog;
        this.log = biglifts.stores.ss.Log;

        this.combinedLog.removeAll();
        this.combinedLog.sync();
        this.log.removeAll();
        this.log.sync();
        this.log.load();
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
});