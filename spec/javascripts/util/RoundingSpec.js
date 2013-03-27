describe("Rounding", function () {
    test("should round to 5s", function () {
        expect(util.roundNumber(10.2, 5, 'normal'),10);
        expect(util.roundNumber(12.5, 5, 'normal'),15);
        expect(util.roundNumber(12.9, 5, 'down'),10);
        expect(util.roundNumber(11, 5, 'up'),15);
    });

    test("should round to 0.5s", function () {
        expect(util.roundNumber(10.5, 0.5, 'normal'),10.5);
        expect(util.roundNumber(12.6, 0.5, 'normal'),12.5);
        expect(util.roundNumber(12.9, 0.5, 'normal'),13);
        expect(util.roundNumber(12.4, 0.5, 'down'),12);
        expect(util.roundNumber(12.1, 0.5, 'up'),12.5);
    });

    test("should round to 0.25s", function () {
        expect(util.roundNumber(10.7, 0.25, 'normal'),10.75);
        expect(util.roundNumber(12.5, 0.25, 'normal'),12.5);
        expect(util.roundNumber(12.9, 0.25, 'normal'),13);
        expect(util.roundNumber(12.9, 0.25, 'down'),12.75);
        expect(util.roundNumber(12.76, 0.25, 'up'),13);
    });
});