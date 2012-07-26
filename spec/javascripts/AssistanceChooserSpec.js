describe("Assistance Chooser", function () {
    it("should determine last used assistance type to be null if no log entries", function () {
        var type = wendler.views.liftSchedule.assistance.getLastAssistanceType();
        expect(type).toEqual(null);
    });

    it("should determine last used assistance type from log entries", function () {
        wendler.stores.assistance.ActivityLog.add({assistanceType:"BBB", timestamp: 10});
        var type = wendler.views.liftSchedule.assistance.getLastAssistanceType();
        expect(type).toEqual('BBB');
    });
});