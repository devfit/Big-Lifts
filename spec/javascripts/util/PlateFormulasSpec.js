module("Plate Breakdown Formulas");

test("should prune zeroed values from a plate configuration", function () {
    deepEqual(util.formulas.plates.pruneZeroedValues({a: 1, b: 0}), {"a": 1});
    deepEqual(util.formulas.plates.pruneZeroedValues({}), {});
});

test("should calculate plates correct with restricted plates", function () {
    deepEqual(util.formulas.buildPlateListForWeight(235, 45, {45: 1, 35: 1, 10: 1, 5: 1}), [45, 35, 10, 5]);
});

test("should calculate plates as close as possible when exact weight can't be made", function () {
    deepEqual(util.formulas.buildPlateListForWeight(70, 45, {45: 1}), []);
});

test("should calculate plate breakdowns for different weights", function () {
    deepEqual(util.formulas.buildPlateListForWeight(35, 45), []);
    deepEqual(util.formulas.buildPlateListForWeight(45, 45), []);
    deepEqual(util.formulas.buildPlateListForWeight(65, 45), [10]);
    deepEqual(util.formulas.buildPlateListForWeight(75, 45), [10, 5]);
    deepEqual(util.formulas.buildPlateListForWeight(100, 45), [25, 2.5]);
    deepEqual(util.formulas.buildPlateListForWeight(105, 45), [25, 5]);
    deepEqual(util.formulas.buildPlateListForWeight(115, 45), [35]);
    deepEqual(util.formulas.buildPlateListForWeight(225, 45), [45, 45]);
    deepEqual(util.formulas.buildPlateListForWeight(235, 45), [45, 45, 5]);
});

test("should calculate 445lbs properly", function () {
    deepEqual(util.formulas.buildPlateListForWeight(445, 45), [45, 45, 45, 45, 10, 10]);
});

test("should handle 20.4kg bar weight", function () {
    deepEqual(util.formulas.buildPlateListForWeight(55, 20.4), [10, 5, 2.5]);
});

test("should handle 20.4kg bar weight for 66kg", function () {
    var platePairs = {10: 4, 5: 1, 2.5: 1, 0.25: 1};
    deepEqual(util.formulas.buildPlateListForWeight(66, 20.4, platePairs), [10, 10, 2.5, 0.25]);
});