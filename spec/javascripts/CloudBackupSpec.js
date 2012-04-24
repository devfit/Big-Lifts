describe("CloudBackup", function () {
    it("should provide unique starting ", function () {
        expect(util.cloudbackup.getUserId()).toEqual('1234');
    });
});