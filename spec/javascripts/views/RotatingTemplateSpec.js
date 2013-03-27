(function () {
    var MODULE_NAME = "Rotating Template";
    module(MODULE_NAME);
    var liftStore;
    var rotatingStore;
    QUnit.moduleStart(function (details) {
        if (details.name === MODULE_NAME) {
            liftStore = biglifts.stores.lifts.Lifts;
            liftStore.removeAll();
            liftStore.sync();

            rotatingStore = Ext.create('RotatingWeekStore');
            rotatingStore.removeAll();
            rotatingStore.sync();
        }
    });

    test("should load the rotating week in memory store from the available lifts", function () {
        liftStore.add({name: "Lift1"});
        liftStore.add({name: "Lift2"});
        liftStore.sync();
        rotatingStore.setupDefaultData();
        equal(rotatingStore.getCount(), 2);
        equal(rotatingStore.first().get('week'), 1);
        equal(rotatingStore.last().get('week'), 2);
    });

    test("should be able to rotate the weeks of the rotating week store", function () {
        liftStore.add({name: "Lift1"});
        liftStore.add({name: "Lift2"});
        liftStore.add({name: "Lift3"});
        liftStore.add({name: "Lift4"});
        rotatingStore.setupDefaultData();
        rotatingStore.rotateWeeks();
        equal(rotatingStore.getAt(0).get('week'), 2);
        equal(rotatingStore.getAt(1).get('week'), 3);
        equal(rotatingStore.getAt(2).get('week'), 4);
        equal(rotatingStore.getAt(3).get('week'), 1);
    });
})();