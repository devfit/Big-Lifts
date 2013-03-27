(function () {
    var MODULE_NAME = "The lift tracking screen";
    module(MODULE_NAME);
    var liftCompletion;
    var liftTracking;
    QUnit.moduleStart(function (details) {
        if (details.name === MODULE_NAME) {
            liftCompletion = biglifts.stores.lifts.LiftCompletion;
            liftTracking = Ext.create('biglifts.views.LiftTracking');
        }
    });

    test("should return true if all lifts are completed", function () {
        biglifts.stores.lifts.LiftCompletion.removeAll();
        liftCompletion.add({liftPropertyName: 'squat', week: 1, completed: true});
        biglifts.stores.lifts.Lifts.add({propertyName: 'squat', enabled: true});
        ok(liftTracking.allLiftsAreCompleted());
    });

    test("should return false if all lifts are not completed", function () {
        liftCompletion.removeAll();
        biglifts.stores.lifts.Lifts.add({propertyName: 'squat', enabled: true});
        biglifts.stores.lifts.Lifts.add({propertyName: 'bench', enabled: true});
        liftCompletion.add({liftPropertyName: 'squat', week: 1, completed: true});
        liftCompletion.add({liftPropertyName: 'bench', week: 2, completed: false});
        equal(liftTracking.allLiftsAreCompleted(), false);
    });

    test("should return true if all enabled lifts are ignored", function () {
        liftCompletion.removeAll();
        biglifts.stores.lifts.Lifts.removeAll();

        biglifts.stores.lifts.Lifts.add({name: 'bench', propertyName: 'squat', enabled: true});
        biglifts.stores.lifts.Lifts.add({name: 'bench', propertyName: 'bench', enabled: false});

        liftCompletion.add({liftPropertyName: 'squat', week: 1, completed: true});
        liftCompletion.add({liftPropertyName: 'bench', week: 2, completed: false});

        ok(liftTracking.allLiftsAreCompleted());
    });
})();