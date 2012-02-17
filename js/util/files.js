Ext.ns('util.files');

util.files.errorCallback = function (e) {
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
        case FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
        default:
            msg = 'Unknown Error';
            break;
    }

    console.log('Error: ' + msg);
};


util.files.requestFileSystem = function (fileSystemObtainedCallback) {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    var type = typeof(LocalFileSystem) !== 'undefined' ? LocalFileSystem.PERSISTENT : window.TEMPORARY;
    window.requestFileSystem(type, 256 * 1024 * 1024, fileSystemObtainedCallback, util.files.errorCallback);
};

util.files.write = function (filename, data, successCallback) {
    var fileEntryObtained = function (fileEntry) {
        fileEntry.createWriter(function (fileWriter) {

            fileWriter.onerror = util.files.errorCallback;
            fileWriter.onwriteend = successCallback;

            if (typeof(window.WebKitBlobBuilder) !== 'undefined') {
                var bb = new window.WebKitBlobBuilder();
                bb.append(data);
                fileWriter.write(bb.getBlob('text/plain'));
            }
            else {
                fileWriter.write(data);
            }
        });
    };

    var fileSystemObtained = function (fileSystem) {
        fileSystem.root.getFile(filename, {create:true}, fileEntryObtained, util.files.errorCallback);
    };

    util.files.requestFileSystem(fileSystemObtained);
};

util.files.read = function (filename, successCallback) {
    var fileObtained = function (file) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            successCallback(e.target.result);
        };
        reader.readAsText(file);
    };

    var fileSystemObtained = function (fileSystem) {
        fileSystem.root.getFile(filename, {}, function (fileEntry) {
            fileEntry.file(fileObtained);
        });
    };

    util.files.requestFileSystem(fileSystemObtained);
};