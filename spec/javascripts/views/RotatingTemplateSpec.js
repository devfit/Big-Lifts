describe("Rotating Template", function () {
    beforeEach(function () {
        this.liftStore = biglifts.stores.lifts.Lifts;
        this.liftStore.removeAll();
        this.liftStore.sync();

        this.rotatingStore = Ext.create('RotatingWeekStore');
        this.rotatingStore.removeAll();
        this.rotatingStore.sync();
    });

    it("should load the rotating week in memory store from the available lifts", function () {
        this.liftStore.add({name: "Lift1"});
        this.liftStore.add({name: "Lift2"});
        this.liftStore.sync();
        this.rotatingStore.setupDefaultData();
        expect(this.rotatingStore.getCount()).toEqual(2);
        expect(this.rotatingStore.first().get('week')).toEqual(1);
        expect(this.rotatingStore.last().get('week')).toEqual(2);
    });

    it("should be able to rotate the weeks of the rotating week store", function () {
        this.liftStore.add({name: "Lift1"});
        this.liftStore.add({name: "Lift2"});
        this.liftStore.add({name: "Lift3"});
        this.liftStore.add({name: "Lift4"});
        this.rotatingStore.setupDefaultData();
        this.rotatingStore.rotateWeeks();
        expect(this.rotatingStore.getAt(0).get('week')).toEqual(2);
        expect(this.rotatingStore.getAt(1).get('week')).toEqual(3);
        expect(this.rotatingStore.getAt(2).get('week')).toEqual(4);
        expect(this.rotatingStore.getAt(3).get('week')).toEqual(1);
    });
});