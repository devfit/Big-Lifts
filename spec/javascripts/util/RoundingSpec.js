describe("Rounding", function () {
    it("should round to 5s", function () {
        expect(util.roundNumber(10.2, 5, 'normal')).toEqual(10);
        expect(util.roundNumber(12.5, 5, 'normal')).toEqual(15);
        expect(util.roundNumber(12.9, 5, 'down')).toEqual(10);
        expect(util.roundNumber(11, 5, 'up')).toEqual(15);
    });

    it("should round to 0.5s", function () {
        expect(util.roundNumber(10.5, 0.5, 'normal')).toEqual(10.5);
        expect(util.roundNumber(12.6, 0.5, 'normal')).toEqual(12.5);
        expect(util.roundNumber(12.9, 0.5, 'normal')).toEqual(13);
        expect(util.roundNumber(12.4, 0.5, 'down')).toEqual(12);
        expect(util.roundNumber(12.1, 0.5, 'up')).toEqual(12.5);
    });

    it("should round to 0.25s", function () {
        expect(util.roundNumber(10.7, 0.25, 'normal')).toEqual(10.75);
        expect(util.roundNumber(12.5, 0.25, 'normal')).toEqual(12.5);
        expect(util.roundNumber(12.9, 0.25, 'normal')).toEqual(13);
        expect(util.roundNumber(12.9, 0.25, 'down')).toEqual(12.75);
        expect(util.roundNumber(12.76, 0.25, 'up')).toEqual(13);
    });
});