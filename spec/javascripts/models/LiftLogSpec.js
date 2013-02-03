describe("The lift log store", function () {
    beforeEach(function () {
        this.liftLog = emptyStore(reloadStore(biglifts.stores.LiftLog));
    });

    it("should return sort by date secondarily if sorting A-Z", function () {
        this.liftLog.add({liftName:'Squat', timestamp:1000});
        this.liftLog.add({liftName:'Squat', timestamp:3000});
        this.liftLog.add({liftName:'Squat', timestamp:4000});
        this.liftLog.add({liftName:'Squat', timestamp:2000});
        this.liftLog.add({liftName:'Press', timestamp:1500});

        this.liftLog.sortLog('liftName', 'ASC');

        expect(this.liftLog.getAt(0).get('liftName')).toEqual("Press");
        expect(this.liftLog.getAt(1).get('timestamp')).toEqual(4000);
        expect(this.liftLog.getAt(2).get('timestamp')).toEqual(3000);
        expect(this.liftLog.getAt(3).get('timestamp')).toEqual(2000);
        expect(this.liftLog.getAt(4).get('timestamp')).toEqual(1000);
    });

    it("should add workout ids with add", function () {
        biglifts.stores.LiftLog.addLogEntry({liftName:'Squat'});
        expect(biglifts.stores.LiftLog.first().get('workout_id')).toEqual(1);

        biglifts.stores.LiftLog.addLogEntry({liftName:'Press'});
        expect(biglifts.stores.LiftLog.last().get('workout_id')).toEqual(2);
    });
});