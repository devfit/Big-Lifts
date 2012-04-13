describe("Parse.com wrapper", function () {
    it("should convert records returned from retrieving records", function () {
        expect(parse.restoreConvertedIds([
            {}
        ])).toEqual([
            {}
        ]);

        expect(parse.restoreConvertedIds([
            {recordId:3, userId:'h'}
        ])).toEqual([
            {id:3, userId:'h'}
        ]);
    });
});