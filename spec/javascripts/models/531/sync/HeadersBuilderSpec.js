describe("Headers Builder", function () {
    beforeEach(function () {
        this.users = emptyStore(reloadStore(biglifts.stores.Users));
        this.builder = Ext.create('biglifts.models.HeadersBuilder');
    });

    it("should build basic auth headers from the user store", function () {
        this.users.add({username: 'bob', password: 'password'});
        expect(this.builder.buildSyncHeaders().Authorization).toEqual('Basic Ym9iOnBhc3N3b3Jk');
    });

    it("should add the app version to the headers", function () {
        this.users.add({username: 'bob', password: 'password'});
        expect(biglifts.version).toBeDefined();
        expect(this.builder.buildSyncHeaders()["AppVersion"]).toEqual(biglifts.version);
    });
});
