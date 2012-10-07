describe("Graph Util", function () {
    beforeEach(function () {
        wendler.stores.LiftLog.removeAll();
        wendler.stores.lifts.Lifts.removeAll();
        wendler.stores.lifts.Lifts.add([
            {name:"Deadlift"},
            {name:"Squat"}
        ]);
    });

    it("should convert timestamps into dates", function () {
        wendler.stores.LiftLog.add({liftName:"Squat", timestamp:Date.parse("01-02-2012").getTime(), weight:300, reps:3});
        var store = wendler.util.graph.convertLogToGraphStore();
        expect(store.first().get('date')).toEqual(Date.parse("01-02-2012"));
    });

    it("should sort log entries by date, regardless of existing sort", function () {
        wendler.stores.LiftLog.add({liftName:"Squat", timestamp:Date.parse("01-02-2012").getTime(), weight:300, reps:3});
        wendler.stores.LiftLog.add({liftName:"Deadlift", timestamp:Date.parse("01-01-2012").getTime(), weight:300, reps:3});
        var store = wendler.util.graph.convertLogToGraphStore();
        expect(store.first().get('Deadlift')).toBeDefined();
    });

    it("should merge log entries on the same day to the same day", function(){
        wendler.stores.LiftLog.add({liftName:"Squat", timestamp:Date.parse("01-02-2012").getTime(), weight:300, reps:3});
        wendler.stores.LiftLog.add({liftName:"Deadlift", timestamp:Date.parse("01-02-2012").getTime(), weight:300, reps:3});
        wendler.stores.LiftLog.add({liftName:"Deadlift", timestamp:Date.parse("01-04-2012").getTime(), weight:300, reps:3});

        var store = wendler.util.graph.convertLogToGraphStore();
        expect(store.getCount()).toEqual(2);
        expect(store.first().get('Squat')).toBeDefined();
        expect(store.first().get('Deadlift')).toBeDefined();
    });

    it("should use one rep max estimates for graph data", function(){
        wendler.stores.LiftLog.add({liftName:"Squat", timestamp:Date.parse("01-02-2012").getTime(), weight:300, reps:3});
        var store = wendler.util.graph.convertLogToGraphStore();
        expect(store.first().get('Squat')).toEqual(329.5);
    });
});