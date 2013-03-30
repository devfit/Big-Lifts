(function () {
    var MODULE_NAME = "Migrations";
    module(MODULE_NAME);
    var migrations;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            migrations = Ext.create('Migrations');
            migrations.MIGRATION_VALUES = [];
        }
    });

    test("should load migrations if migrations are missing", function () {
        Ext.define('test.C1', {run: function () {
        }});
        Ext.define('test.C2', {run: function () {
        }});

        migrations.MIGRATION_VALUES = [
            {klass: 'test.C1', done: false},
            {klass: 'test.C2', done: false}
        ];
        migrations.add({klass: 'test.C1', done: true});
        migrations.sync();
        migrations.loadMissingMigrations();
        equal(migrations.getCount(), 2);
    });

    test("should run migrations on load", function () {
        var run = false;
        Ext.define('test.klass10', {
            run: function () {
                run = true;
            }
        });

        migrations.MIGRATION_VALUES = [
            {klass: 'test.klass10', done: false}
        ];

        migrations.load();

        ok(run);
    });

    test("should not run previously-run migrations load", function () {
        var run = false;
        Ext.define('test.klass3', {
            run: function () {
                run = true;
            }
        });

        migrations.MIGRATION_VALUES = [
            {klass: 'test.klass3', done: false}
        ];

        migrations.add({klass: 'test.klass3', done: true});
        migrations.sync();
        migrations.load();
        equal(run, false);
    });

    test("should mark migrations done when run", function () {
        Ext.define('test.klass4', {
            run: function () {
            }
        });

        migrations.add({klass: 'test.klass4', done: false});
        migrations.sync();
        migrations.load();
        ok(migrations.first().get('done'));
    });
})();