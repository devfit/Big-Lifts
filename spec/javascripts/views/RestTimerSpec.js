describe("Rest Timer", function () {
    it("should format seconds to minutes", function () {
        expect(biglifts.restTimer.convertSecondsForDisplay(60)).toEqual('1:00');
    });

    it("should handle 0 seconds", function () {
        expect(biglifts.restTimer.convertSecondsForDisplay(0)).toEqual('0:00');
    });

    it("should show double digit seconds", function () {
        expect(biglifts.restTimer.convertSecondsForDisplay(71)).toEqual('1:11');
    });
});