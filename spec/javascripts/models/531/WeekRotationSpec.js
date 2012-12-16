describe("Week Rotations", function () {
    beforeEach(function () {
        this.lifts = biglifts.stores.lifts.Lifts;
        this.rotations = biglifts.stores.WeekRotation;

        this.lifts.load();
        this.lifts.removeAll();
        this.lifts.sync();

        this.rotations.load();
        this.rotations.removeAll();
        this.rotations.sync();
    });

    it("should not add rotations if the store is empty", function () {
        expect(this.rotations.getCount()).toEqual(0);
        this.lifts.add({name: "Squat"});
        this.lifts.sync();

        expect(this.rotations.getCount()).toEqual(0);
    });

    it("should add rotations to match when lifts are added", function () {
        this.lifts.add({name: "Squat", propertyName: 'squat'});
        this.lifts.sync();
        this.lifts.fireEvent('beforesync');

        this.rotations.add({liftProperty: 'squat'});
        this.rotations.sync();
        expect(this.rotations.getCount()).toEqual(1);

        this.lifts.add({name: 'Press', propertyName: 'press'});
        this.lifts.sync();
        this.lifts.fireEvent('beforesync');

        expect(this.rotations.getCount()).toEqual(2);
    });

    it("should should remove rotations when lifts are deleted", function () {
        expect(this.rotations.getCount()).toEqual(0);

        this.lifts.add({name: "Squat", propertyName: 'squat'});
        this.lifts.sync();

        this.rotations.add({liftProperty: 'squat'});
        this.rotations.sync();
        expect(this.rotations.getCount()).toEqual(1);

        this.lifts.removeAll();
        this.lifts.sync();
        this.lifts.fireEvent('beforesync');

        expect(this.rotations.getCount()).toEqual(0);
    });
});