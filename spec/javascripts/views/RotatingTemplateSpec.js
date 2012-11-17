describe("Rotating Template", function () {
    var rotatingStore = biglifts.liftSettings.templates.rotatingWeekStore;
    var liftStore = biglifts.stores.lifts.Lifts;
    beforeEach(function(){
        liftStore.removeAll();
        liftStore.sync();

        rotatingStore.removeAll();
        rotatingStore.sync();
    });

    it("should load the rotating week in memory store from the available lifts", function () {
        liftStore.add({name:"Lift1"});
        liftStore.add({name:"Lift2"});
        liftStore.sync();
        rotatingStore.setupDefaultData();
        expect(rotatingStore.getCount()).toEqual(2);
        expect(rotatingStore.first().get('week')).toEqual(1);
        expect(rotatingStore.last().get('week')).toEqual(2);
    });

    it("should be able to rotate the weeks of the rotating week store", function () {
        liftStore.add({name:"Lift1"});
        liftStore.add({name:"Lift2"});
        liftStore.add({name:"Lift3"});
        liftStore.add({name:"Lift4"});
        biglifts.liftSettings.templates.rotatingWeekStore.setupDefaultData();
        rotatingStore.rotateWeeks();
        expect(rotatingStore.getAt(0).get('week')).toEqual(2);
        expect(rotatingStore.getAt(1).get('week')).toEqual(3);
        expect(rotatingStore.getAt(2).get('week')).toEqual(4);
        expect(rotatingStore.getAt(3).get('week')).toEqual(1);
    });
});