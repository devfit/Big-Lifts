describe("CloudBackup", function () {
    it("should provide unique starting ", function () {
        expect(util.cloudbackup.getUserIdByDeviceId()).toEqual('1234');
    });
});