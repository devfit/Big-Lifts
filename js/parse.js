Ext.ns('parse', 'parse.responseCodes');
parse.APP_ID = "rDeR8B3NI5IXuRn5NYKkROXH1IHPEcDOibhJmHZ2";
parse.CLIENT_KEY = "Uj1molQEO5RMpOrlUAbHLZVRHouwRT2xkDnnDMKw";
parse.API_KEY = "4IqPWsP05WuyzmmOGBikgolpmMsH07UYpiVFecgF";
parse.MASTER_KEY = "1PkcSJHvNRRMqsDArvlJn832kLwtFKL6y3DObApM";
parse.BASE_URL = "https://api.parse.com";
parse.API_VERSION = "1";

parse.responseCodes.USER_ALREADY_CREATED = 202;

parse.loginUserById = function (id, callback) {
    var loginParams = {
        'username':id,
        'password':id
    };

    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/login?" + Ext.urlEncode(loginParams);

    Ext.Ajax.request({
        url:url,
        method:'GET',
        headers:_.extend(parse.getAuthenticationHeaders(), {'Content-Type':'application/json'}),
        success:function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            callback(jsonResponse);
        },
        failure:function (response) {
            callback(null);
        }
    });
};

parse.createUserForId = function (id, callback) {
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/users";

    Ext.Ajax.request({
            url:url,
            method:'POST',
            headers:_.extend(parse.getAuthenticationHeaders(), {'Content-Type':'application/json'}),
            params:JSON.stringify({
                username:id,
                password:id
            }),
            success:function (response) {
                callback(true);
            },
            failure:function (response) {
                var responseJson = JSON.parse(response.responseText);
                callback(false);
            }
        }
    );
};

parse.getRecordsForUser = function (id, recordName, callback) {
    var queryConstraints = {where:JSON.stringify({userId:id})};
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/classes/" + recordName + "?" + Ext.urlEncode(queryConstraints);

    Ext.Ajax.request({
            url:url,
            method:'GET',
            headers:_.extend(parse.getAuthenticationHeaders(), {'Content-Type':'application/json'}),
            params:JSON.stringify({
                username:id,
                password:id
            }),
            success:function (response) {
                var responseJson = JSON.parse(response.responseText);
                callback(responseJson.results);
            },
            failure:function (response) {
                callback(null);
            }
        }
    );
};

parse.saveRecordForUser = function (id, recordName, record, callback) {
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/classes/" + recordName;
    var recordToSave = _.extend(record, {'userId':id});

    Ext.Ajax.request({
            url:url,
            method:'POST',
            headers:_.extend(parse.getAuthenticationHeaders(), {'Content-Type':'application/json'}),
            params:JSON.stringify(recordToSave),
            success:function (response) {
                var responseJson = JSON.parse(response.responseText);
                callback(responseJson);
            },
            failure:function (response) {
                callback(null);
            }
        }
    );
};

parse.getAuthenticationHeaders = function () {
    return {
        'X-Parse-Application-Id':parse.APP_ID,
        'X-Parse-REST-API-Key':parse.API_KEY
    };
};