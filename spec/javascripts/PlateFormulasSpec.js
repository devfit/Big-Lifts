describe("Plate Breakdown Formulas", function () {

    it("should prune zeroed values from a plate configuration", function () {
        expect(util.formulas.plates.pruneZeroedValues({a:1, b:0})).toEqual({"a":1});
        expect(util.formulas.plates.pruneZeroedValues({})).toEqual({});
    });

    it("should calculate plates correct with restricted plates", function () {
        expect(util.formulas.buildPlateListForWeight(235, 45, {45:1, 35:1, 10:1, 5:1})).toEqual([45, 35, 10, 5]);
    });

    it("should calculate plates as close as possible when exact weight can't be made", function () {
        expect(util.formulas.buildPlateListForWeight(70, 45, {45:1})).toEqual([]);
    });

    it("should calculate plate breakdowns for different weights", function () {
        expect(util.formulas.buildPlateListForWeight(35, 45)).toEqual([]);
        expect(util.formulas.buildPlateListForWeight(45, 45)).toEqual([]);
        expect(util.formulas.buildPlateListForWeight(65, 45)).toEqual([10]);
        expect(util.formulas.buildPlateListForWeight(75, 45)).toEqual([15]);
        expect(util.formulas.buildPlateListForWeight(100, 45)).toEqual([25, 2.5]);
        expect(util.formulas.buildPlateListForWeight(105, 45)).toEqual([25, 5]);
        expect(util.formulas.buildPlateListForWeight(115, 45)).toEqual([35]);
        expect(util.formulas.buildPlateListForWeight(225, 45)).toEqual([45, 45]);
        expect(util.formulas.buildPlateListForWeight(235, 45)).toEqual([45, 45, 5]);
    });
});