describe("Assistance Chooser", function () {
    beforeEach(function(){
       this.assistanceChooser = Ext.create('biglifts.views.AssistanceChooser');
    });

    it("should determine last used assistance type to be null if no log entries", function () {
        var type = this.assistanceChooser.getLastAssistanceType();
        expect(type).toEqual(null);
    });

    it("should determine last used assistance type from log entries", function () {
        biglifts.stores.assistance.ActivityLog.add({assistanceType:"BBB", timestamp: 10});
        var type = this.assistanceChooser.getLastAssistanceType();
        expect(type).toEqual('BBB');
    });
});