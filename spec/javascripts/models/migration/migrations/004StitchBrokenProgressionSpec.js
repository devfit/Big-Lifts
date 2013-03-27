(function () {
    module("Stitch Broken Progressions Migration");

    reloadStore(emptyStore(biglifts.stores.Routine)).setup531();
    var migration = Ext.create('biglifts.migrations.stitchBrokenLiftTemplates');
    var liftProgressions = emptyStore(reloadStore(biglifts.stores.lifts.LiftProgression));

    test("should stitch bad lift progression sets", function () {
        liftProgressions.add({week: 1, set: 1});
        liftProgressions.add({week: 1, set: 3});
        liftProgressions.add({week: 1, set: 5});
        liftProgressions.add({week: 2, set: 1});
        liftProgressions.add({week: 2, set: 2});
        liftProgressions.add({week: 2, set: 4});
        liftProgressions.sync();

        migration.run();

        var i = 0;
        liftProgressions.each(function (p) {
            var expectedSet = (i % 3) + 1;
            i++;
            equal(p.get('set'), expectedSet);
        });
    });
})();