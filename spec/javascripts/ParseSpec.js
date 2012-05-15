describe("Parse", function () {
    it("should remove dashes in record names", function () {
        expect(parse.encodeRecordName('lift-proxy')).toEqual('lift_proxy');
    });

    it("should add dashes to record names while decoding", function () {
        expect(parse.decodeRecordName('lift_proxy')).toEqual('lift-proxy');
    });
});