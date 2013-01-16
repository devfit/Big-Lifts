describe("biglifts.views.SstCustomPanel", function () {
    beforeEach(function () {
        this.panel = Ext.create("biglifts.views.SstCustomPanel");
        this.liftCompletions = biglifts.stores.lifts.LiftCompletion;
        reloadStore(biglifts.stores.lifts.Lifts);
        reloadStore(this.liftCompletions);
        expect(this.liftCompletions.getCount()).toEqual(16);
    });

    it("should return 1 for the highest completed week for an associated lift for no completions", function () {
        expect(this.panel.findLastCompletedWeek('squat')).toEqual(1);
    });

    it("should return 3 for the highest completed week for an associated lift for 3 completions", function () {
        for (var week = 1; week <= 3; week++) {
            var index = this.liftCompletions.findBy(function (c) {
                return c.get('liftPropertyName') === 'squat' && c.get('week') === week;
            });
            var completion = this.liftCompletions.getAt(index);
            completion.set('completed', true);
        }
        this.liftCompletions.sync();

        expect(this.panel.findLastCompletedWeek('squat')).toEqual(3);
    });
});