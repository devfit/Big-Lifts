describe("Starting Strength template switcher", function () {
    beforeEach(function () {
        ensureLoaded(biglifts.stores.GlobalSettings);
        expect(biglifts.stores.GlobalSettings.getCount()).toEqual(1);
        this.lifts = reloadStore(biglifts.stores.ss.Lifts);
    });

    var getCurrentRecords = function (me) {
        var currentRecords = {};
        me.lifts.each(function (l) {
            currentRecords[l.get('name')] = l.get('id');
        });

        return currentRecords;
    };

    var assertExistingLiftsAreTheSame = function (me, previousRecords) {
        me.lifts.each(function (l) {
            if (previousRecords[l.get('name')]) {
                expect(me.lifts.findRecord('name', l.get('name')).get('id')).toEqual(previousRecords[l.get('name')]);
            }
        });
    };

    it("should switch set lifts to novice entries, leaving existing entries", function () {
        var previousRecords = getCurrentRecords(this);
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Novice');

        expect(this.lifts.getCount()).toEqual(4);
        assertExistingLiftsAreTheSame(this, previousRecords);
    });

    it("should switch set lifts to standard entries, adding needed entries", function () {
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Novice');

        var previousRecords = getCurrentRecords(this);
        Ext.create('biglifts.models.startingstrength.TemplateSwitcher').switchTo('Standard');

        expect(this.lifts.getCount()).toEqual(5);
        assertExistingLiftsAreTheSame(this, previousRecords);
    });
});
