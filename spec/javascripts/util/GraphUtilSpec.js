describe("Graph Util", function () {
    beforeEach(function () {
        biglifts.stores.LiftLog.removeAll();
        biglifts.stores.lifts.Lifts.removeAll();
        biglifts.stores.lifts.Lifts.add([
            {name:"Deadlift"},
            {name:"Squat"}
        ]);
    });

    it("should convert timestamps into dates", function () {
        biglifts.stores.LiftLog.add({liftName:"Squat", timestamp:Date.parse("01-02-2012").getTime(), weight:300, reps:3});
        var store = biglifts.util.graph.convertLogToGraphStore();
        expect(store.first().get('date')).toEqual(Date.parse("01-02-2012"));
    });

    it("should sort log entries by date, regardless of existing sort", function () {
        biglifts.stores.LiftLog.add({liftName:"Squat", timestamp:Date.parse("01-02-2012").getTime(), weight:300, reps:3});
        biglifts.stores.LiftLog.add({liftName:"Deadlift", timestamp:Date.parse("01-01-2012").getTime(), weight:300, reps:3});
        var store = biglifts.util.graph.convertLogToGraphStore();
        expect(store.first().get('Deadlift')).toBeDefined();
    });

    it("should merge log entries on the same day to the same day", function(){
        biglifts.stores.LiftLog.add({liftName:"Squat", timestamp:Date.parse("01-02-2012").getTime(), weight:300, reps:3});
        biglifts.stores.LiftLog.add({liftName:"Deadlift", timestamp:Date.parse("01-02-2012").getTime(), weight:300, reps:3});
        biglifts.stores.LiftLog.add({liftName:"Deadlift", timestamp:Date.parse("01-04-2012").getTime(), weight:300, reps:3});

        var store = biglifts.util.graph.convertLogToGraphStore();
        expect(store.getCount()).toEqual(2);
        expect(store.first().get('Squat')).toBeDefined();
        expect(store.first().get('Deadlift')).toBeDefined();
    });

    it("should use one rep max estimates for graph data", function(){
        biglifts.stores.LiftLog.add({liftName:"Squat", timestamp:Date.parse("01-02-2012").getTime(), weight:300, reps:3});
        var store = biglifts.util.graph.convertLogToGraphStore();
        expect(store.first().get('Squat')).toEqual(329.5);
    });
});