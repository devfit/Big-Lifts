(function () {
    var MODULE_NAME = "Headers Builder";
    module(MODULE_NAME);
    var users;
    var builder;
    QUnit.testStart(function (details) {
        if (details.module === MODULE_NAME) {
            users = emptyStore(reloadStore(biglifts.stores.Users));
            builder = Ext.create('biglifts.models.HeadersBuilder');
        }
    });

    test("should build basic auth headers from the user store", function () {
        users.add({username: 'bob', password: 'password'});
        equal(builder.buildSyncHeaders().Authorization, 'Basic Ym9iOnBhc3N3b3Jk');
    });

    test("should add the app version to the headers", function () {
        users.add({username: 'bob', password: 'password'});
        ok(biglifts.version);
        equal(builder.buildSyncHeaders()["AppVersion"], biglifts.version);
    });
})();