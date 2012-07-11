Ext.ns('util.phonegap');

util.phonegap.getResourcesPath = function () {
    var path = window.location.pathname;
    path = path.substr(path, path.length - 11);

    var FILE_PREFIX = 'file://';
    if (path.indexOf(FILE_PREFIX) !== -1) {
        path = path.substring(FILE_PREFIX.length, path.length);
    }

    return path;
};