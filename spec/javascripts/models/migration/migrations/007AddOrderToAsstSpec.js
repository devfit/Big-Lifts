describe("Adding order to assistance migration", function () {
    beforeEach(function () {
        this.routines = biglifts.stores.Routine;
        this.migration = Ext.create('biglifts.migrations.AddOrderToAssistance');
        this.triumvirate = biglifts.stores.assistance.TriumvirateMovement;
        this.bodyweight = biglifts.stores.assistance.BodyweightMovement;
        this.bbb = biglifts.stores.assistance.BoringButBig;
        this.lifts = biglifts.stores.lifts.Lifts;
        reloadStore(this.lifts);
        reloadStore(this.triumvirate);
        reloadStore(this.bodyweight);
        reloadStore(this.bbb);
    });

    test("should add order to triumvirate", function () {
        this.migration.run();
        this.routines.fireEvent('load');
        expect(this.triumvirate.getCount(),8);

        var me = this;
        this.lifts.each(function (l) {
            var property = l.get('propertyName');
            me.triumvirate.filter('liftProperty', property);
            expect(me.triumvirate.first().get('order'),0);
            expect(me.triumvirate.last().get('order'),1);
        });
    });

    test("should add order to bodyweight", function () {
        expect(this.bodyweight.getCount(),8);
        this.migration.run();
        this.routines.fireEvent('load');

        var me = this;
        this.lifts.each(function (l) {
            var property = l.get('propertyName');
            me.bodyweight.filter('liftProperty', property);
            expect(me.bodyweight.first().get('order'),0);
            expect(me.bodyweight.last().get('order'),1);
        });
    });

    test("should add order to bbb", function () {
        this.migration.run();
        this.routines.fireEvent('load');
        expect(this.bbb.getCount(),4);

        var me = this;
        this.lifts.each(function (l) {
            me.bbb.filter('lift_id', l.get('id'));
            expect(me.bbb.first().get('order'),0);
        });
    });
});