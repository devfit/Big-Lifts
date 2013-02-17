Ext.define("biglifts.models.HeadersBuilder", {
    buildAuthHeaders:function () {
        var user = biglifts.stores.Users.first();
        if (user) {
            var username = user.get('username');
            var password = user.get('password');
            var key = Base64.encode(username + ":" + password);
            return {Authorization:"Basic " + key};
        }
        else {
            return {};
        }
    }
});