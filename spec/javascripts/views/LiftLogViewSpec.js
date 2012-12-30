describe("Lift Log view", function () {
    beforeEach(function () {
        biglifts.stores.LiftLog.removeAll();
        biglifts.stores.assistance.ActivityLog.removeAll();

        biglifts.stores.LiftLog.sync();
        biglifts.stores.assistance.ActivityLog.sync();
        biglifts.stores.LogSort.load();
    });

    it("should return 'All' with no cycles available", function () {
        var logList = Ext.create('biglifts.views.LogList');
        expect(logList.getCycleOptions()).toEqual([
            {value:'All'}
        ]);
    });
    it("should determine available cycles and sort them descending", function () {
        var logList = Ext.create('biglifts.views.LogList');
        var liftLog = biglifts.stores.LiftLog;
        var assistanceLog = biglifts.stores.assistance.ActivityLog;

        liftLog.add({cycle:1});
        assistanceLog.add({cycle:2});

        expect(logList.getCycleOptions()).toEqual([
            {value:'All'},
            {value:2},
            {value:1}
        ]);
    });
});