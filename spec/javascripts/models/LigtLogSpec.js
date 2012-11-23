describe("The lift log store", function () {
    beforeEach(function () {
        biglifts.stores.LiftLog.removeAll();
    });

    it("should return sort by date secondarily if sorting A-Z", function () {
        biglifts.stores.LiftLog.add({liftName:'Squat', timestamp:1000});
        biglifts.stores.LiftLog.add({liftName:'Squat', timestamp:3000});
        biglifts.stores.LiftLog.add({liftName:'Squat', timestamp:4000});
        biglifts.stores.LiftLog.add({liftName:'Squat', timestamp:2000});
        biglifts.stores.LiftLog.add({liftName:'Press', timestamp:1500});

        biglifts.stores.LiftLog.sortLog('liftName', 'ASC');

        expect(biglifts.stores.LiftLog.getAt(0).get('liftName')).toEqual("Press");
        expect(biglifts.stores.LiftLog.getAt(1).get('timestamp')).toEqual(4000);
        expect(biglifts.stores.LiftLog.getAt(2).get('timestamp')).toEqual(3000);
        expect(biglifts.stores.LiftLog.getAt(3).get('timestamp')).toEqual(2000);
        expect(biglifts.stores.LiftLog.getAt(4).get('timestamp')).toEqual(1000);
    });
});