describe("Assistance Chooser", function () {
    it("should determine last used assistance type to be null if no log entries", function () {
        var type = biglifts.views.liftSchedule.assistance.getLastAssistanceType();
        expect(type).toEqual(null);
    });

    it("should determine last used assistance type from log entries", function () {
        biglifts.stores.assistance.ActivityLog.add({assistanceType:"BBB", timestamp: 10});
        var type = biglifts.views.liftSchedule.assistance.getLastAssistanceType();
        expect(type).toEqual('BBB');
    });
});