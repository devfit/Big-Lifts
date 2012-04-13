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

parse.createUser = function (userId, callback) {
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/users";

    Ext.Ajax.request({
            url:url,
            method:'POST',
            headers:_.extend(parse.getAuthenticationHeaders(), {'Content-Type':'application/json'}),
            params:JSON.stringify({
                username:userId,
                password:userId
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

parse.getRecordsForUser = function (userId, recordName, callback) {
    var queryConstraints = {where:JSON.stringify({userId:userId})};
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/classes/" + recordName + "?" + Ext.urlEncode(queryConstraints);

    Ext.Ajax.request({
            url:url,
            method:'GET',
            headers:_.extend(parse.getAuthenticationHeaders(), {'Content-Type':'application/json'}),
            success:function (response) {
                var responseJson = JSON.parse(response.responseText);
                callback(parse.restoreConvertedIds(responseJson.results));
            },
            failure:function (response) {
                callback(null);
            }
        }
    );
};

parse.restoreConvertedIds = function (array) {
    return _.map(array, function (record) {
        var copy = _.clone(record);
        var id = copy['recordId'];
        delete copy['recordId'];
        copy['id'] = id;
        return copy;
    });
};

parse.saveRecordForUser = function (userId, recordName, record, callback) {
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/classes/" + recordName;

    var recordId = record.id;
    var recordToSave = _.extend(record, {'userId':userId, 'recordId':recordId});
    //parse tacitly fails to save the "id" column, copying the value of objectid
    delete record['id'];

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

parse.updateRecordForUser = function (userId, recordName, record, callback) {

};

parse.getRecordById = function (userId, recordName, recordId, callback) {
    var queryConstraints = {where:JSON.stringify({userId:userId, recordId:recordId})};
    var url = parse.BASE_URL + "/" + parse.API_VERSION + "/classes/" + recordName + "?" + Ext.urlEncode(queryConstraints);

    Ext.Ajax.request({
            url:url,
            method:'GET',
            headers:_.extend(parse.getAuthenticationHeaders(), {'Content-Type':'application/json'}),
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

parse.getAuthenticationHeaders = function () {
    return {
        'X-Parse-Application-Id':parse.APP_ID,
        'X-Parse-REST-API-Key':parse.API_KEY
    };
};