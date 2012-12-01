describe("Migrations", function () {
    beforeEach(function () {
        localStorage.clear();
        this.migrations = Ext.create('Migrations');
        this.migrations.MIGRATION_VALUES = [];
    });

    it("should load migrations if migrations are missing", function () {
        Ext.define('test.C1', {run:function () {
        }});
        Ext.define('test.C2', {run:function () {
        }});

        this.migrations.MIGRATION_VALUES = [
            {class:'test.C1', done:false},
            {class:'test.C2', done:false}
        ];
        this.migrations.add({class:'test.C1', done:true});
        this.migrations.sync();
        this.migrations.loadMissingMigrations();
        expect(this.migrations.getCount()).toEqual(2);
    });

    it("should run migrations on load", function () {
        var run = false;
        Ext.define('test.Class10', {
            run:function () {
                run = true;
            }
        });

        this.migrations.MIGRATION_VALUES = [
            {class:'test.Class10', done:false}
        ];

        this.migrations.load();

        waitsFor(function () {
            return run;
        }, "Run never set to true", 1000);

        expect(run).toBe(true);
    });

    it("should not run previously-run migrations load", function () {
        var run = false;
        Ext.define('test.Class3', {
            run:function () {
                run = true;
            }
        });

        this.migrations.MIGRATION_VALUES = [
            {class:'test.Class3', done:false}
        ];

        this.migrations.add({class:'test.Class3', done:true});
        this.migrations.sync();
        this.migrations.load();
        expect(run).toBe(false);
    });

    it("should mark migrations done when run", function () {
        Ext.define('test.Class4', {
            run:function () {
            }
        });

        this.migrations.add({class:'test.Class4', done:false});
        this.migrations.sync();
        this.migrations.load();
        expect(this.migrations.first().get('done')).toBe(true);
    });
});