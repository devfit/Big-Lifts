Ext.define("biglifts.models.HeadersBuilder", {
    buildSyncHeaders: function () {
        var user = biglifts.stores.Users.first();
        var headers = {};
        if (user) {
            var username = user.get('username');
            var password = user.get('password');
            var key = Base64.encode(username + ":" + password);
            headers["Authorization"] = "Basic " + key;
        }

        headers["AppVersion"] = biglifts.version;
        return headers;
    }
});