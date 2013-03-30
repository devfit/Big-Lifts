(function () {
    var MODULE_NAME = "Rest Timer";
    module(MODULE_NAME);

    var restTimer;
    QUnit.moduleStart(function (details) {
        if (details.name === MODULE_NAME) {
            restTimer = Ext.create('biglifts.views.RestTimer');
        }
    });

    test("should format seconds to minutes", function () {
        equal(restTimer.convertSecondsForDisplay(60), '1:00');
    });

    test("should handle 0 seconds", function () {
        equal(restTimer.convertSecondsForDisplay(0), '0:00');
    });

    test("should show double digit seconds", function () {
        equal(restTimer.convertSecondsForDisplay(71), '1:11');
    });
})();