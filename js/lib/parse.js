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
        headers:_.extend(parse.getParseRequestHeaders()),
        success:function (response) {
            var jsonResponse = JSON.parse(response.responseText);
            callback(null, jsonResponse);
        },
        failure:function (response) {
            callback(null);
        }
    });
};

parse.createUser = function (userId, callback) {
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/users";

    Ext.Ajax.request({
            url:url,
            method:'POST',
            headers:_.extend(parse.getParseRequestHeaders()),
            params:JSON.stringify({
                username:userId,
                password:userId,
                uuid:device.uuid
            }),
            success:function (response) {
                callback(null, true);
            },
            failure:function (response) {
                callback(null, false);
            }
        }
    );
};

parse.getRecordsForUser = function (userId, recordName, callback) {
    var queryConstraints = {where:JSON.stringify({userId:userId})};
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/classes/" + recordName + "?" + Ext.urlEncode(queryConstraints);

    Ext.Ajax.request({
            url:url,
            method:'GET',
            headers:_.extend(parse.getParseRequestHeaders()),
            success:function (response) {
                var responseJson = JSON.parse(response.responseText);
                callback(null, recordName, responseJson.results);
            },
            failure:function (response) {
                callback(null, recordName);
            }
        }
    );
};

parse.saveRecordForUser = function (userId, recordName, record, callback) {
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/classes/" + recordName;
    var recordToSave = _.extend(record, {'userId':userId});

    Ext.Ajax.request({
            url:url,
            method:'POST',
            headers:_.extend(parse.getParseRequestHeaders()),
            params:JSON.stringify(recordToSave),
            success:function (response) {
                var responseJson = JSON.parse(response.responseText);
                callback(null, responseJson);
            },
            failure:function (response) {
                callback(null);
            }
        }
    );
};

parse.updateRecordForUser = function (userId, recordName, objectId, record, callback) {
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/classes/" + recordName + "/" + objectId;
    var recordToSave = _.extend(record, {'userId':userId});

    Ext.Ajax.request({
            url:url,
            method:'PUT',
            headers:_.extend(parse.getParseRequestHeaders()),
            params:JSON.stringify(recordToSave),
            success:function (response) {
                var responseJson = JSON.parse(response.responseText);
                callback(null, responseJson);
            },
            failure:function (response) {
                callback(null);
            }
        }
    );
};

parse.getRecordById = function (userId, recordName, recordId, callback) {
    var queryConstraints = {where:JSON.stringify({userId:userId, recordId:recordId})};
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/classes/" + recordName + "?" + Ext.urlEncode(queryConstraints);

    Ext.Ajax.request({
            url:url,
            method:'GET',
            headers:_.extend(parse.getParseRequestHeaders()),
            success:function (response) {
                var responseJson = JSON.parse(response.responseText);
                callback(null, responseJson.results);
            },
            failure:function (response) {
                callback(null);
            }
        }
    );
};

parse.getParseRequestHeaders = function () {
    return {
        'X-Parse-Application-Id':parse.APP_ID,
        'X-Parse-REST-API-Key':parse.API_KEY,
        'Content-Type':'application/json'
    };
};