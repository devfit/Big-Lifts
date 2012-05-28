describe("Rest Timer", function () {
    it("should format seconds to minutes", function () {
        expect(wendler.restTimer.controller.convertSecondsForDisplay(60)).toEqual('1:00');
    });

    it("should handle 0 seconds", function () {
        expect(wendler.restTimer.controller.convertSecondsForDisplay(0)).toEqual('0:00');
    });

    it("should show double digit seconds", function () {
        expect(wendler.restTimer.controller.convertSecondsForDisplay(71)).toEqual('1:11');
    });
});