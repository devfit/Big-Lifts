describe("Fix Ss Doubling", function () {
    beforeEach(function () {
        this.routines = reloadStore(biglifts.stores.Routine);
        this.routines.add({name:'5/3/1'});
        this.routines.sync();
        this.lifts = reloadStore(biglifts.stores.ss.Lifts);
        this.workouts = reloadStore(emptyStore(reloadStore(biglifts.stores.ss.WorkoutStore)));
        this.migration = Ext.create('biglifts.migrations.FixSsPressPercentage');
    });

    it('should determine the current template for standard', function () {
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Standard');
        expect(this.migration.getTemplateName()).toEqual("standard");
    });

    it('should determine the current template for novice', function () {
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Novice');
        expect(this.migration.getTemplateName()).toEqual("novice");
    });
});