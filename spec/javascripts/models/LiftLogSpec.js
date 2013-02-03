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
        this.liftLog.addLogEntry({liftName:'Squat'});
        expect(this.liftLog.findRecord('liftName', 'Squat').get('workout_id')).toEqual(1);
        this.liftLog.addLogEntry({liftName:'Press'});
        expect(this.liftLog.findRecord('liftName', 'Press').get('workout_id')).toEqual(2);
    });

    it("should restitch workout ids when log entries are removed", function () {
        this.liftLog.addLogEntry({liftName:'Squat'});
        this.liftLog.addLogEntry({liftName:'Press'});
        this.liftLog.addLogEntry({liftName:'Deadlift'});
        this.liftLog.remove(this.liftLog.findRecord('liftName', 'Press'));
        expect(this.liftLog.findRecord('liftName', 'Deadlift').get('workout_id')).toEqual(2);
    });
});