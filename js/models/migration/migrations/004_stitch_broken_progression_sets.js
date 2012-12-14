Ext.define('biglifts.migrations.stitchBrokenLiftTemplates', {
    run: function () {
        util.withLoadedStore(biglifts.stores.Routine, function () {
            if (biglifts.stores.Routine.getCount() === 0) {
                return;
            }

            util.withLoadedStore(biglifts.stores.lifts.LiftProgression, function () {
                var store = biglifts.stores.lifts.LiftProgression;
                var weeks = [];
                store.each(function (p) {
                    var week = p.get('week');
                    if (_.indexOf(weeks, week) === -1) {
                        weeks.push(week);
                    }
                });

                _.each(weeks, function (week) {
                    store.filter('week', week);
                    var i = 1;
                    store.each(function (p) {
                        p.set('set', i++);
                    });
                });

                store.sync();
            });
        });
    }
});