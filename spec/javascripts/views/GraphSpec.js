(function () {
    var MODULE_NAME = "5/3/1 lift graph";
    module(MODULE_NAME);
    var lifts;
    var graph;
    QUnit.moduleStart(function (details) {
        if (details.name === MODULE_NAME) {
            lifts = reloadStore(biglifts.stores.lifts.Lifts);
            graph = Ext.create('biglifts.views.LiftGraph');
        }
    });

    test("should generate lift select options", function () {
        var expected = [
            {text: 'All', value: 'all'},
            {text: 'Press', value: lifts.findRecord('name', 'Press').get('id')},
            {text: 'Deadlift', value: lifts.findRecord('name', 'Deadlift').get('id')},
            {text: 'Bench', value: lifts.findRecord('name', 'Bench').get('id')},
            {text: 'Squat', value: lifts.findRecord('name', 'Squat').get('id')}
        ];
        deepEqual(graph.getLiftOptions(), expected);
    });
})();