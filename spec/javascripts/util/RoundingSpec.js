module("Rounding");
test("should round to 5s", function () {
    equal(util.roundNumber(10.2, 5, 'normal'), 10);
    equal(util.roundNumber(12.5, 5, 'normal'), 15);
    equal(util.roundNumber(12.9, 5, 'down'), 10);
    equal(util.roundNumber(11, 5, 'up'), 15);
});

test("should round to 0.5s", function () {
    equal(util.roundNumber(10.5, 0.5, 'normal'), 10.5);
    equal(util.roundNumber(12.6, 0.5, 'normal'), 12.5);
    equal(util.roundNumber(12.9, 0.5, 'normal'), 13);
    equal(util.roundNumber(12.4, 0.5, 'down'), 12);
    equal(util.roundNumber(12.1, 0.5, 'up'), 12.5);
});

test("should round to 0.25s", function () {
    equal(util.roundNumber(10.7, 0.25, 'normal'), 10.75);
    equal(util.roundNumber(12.5, 0.25, 'normal'), 12.5);
    equal(util.roundNumber(12.9, 0.25, 'normal'), 13);
    equal(util.roundNumber(12.9, 0.25, 'down'), 12.75);
    equal(util.roundNumber(12.76, 0.25, 'up'), 13);
});