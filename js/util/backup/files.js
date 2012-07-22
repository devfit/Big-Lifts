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

util.files.BYTES_PER_KB = 1024;
util.files.KB_PER_MB = 1024;
util.files.requestedFileSystemSizeBytes = Ext.os.is.Linux ? 5 * util.files.KB_PER_MB * util.files.BYTES_PER_KB : 0;
util.files.requestFileSystem = function (fileSystemObtainedCallback, errorCallback) {
    var requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    if (_.isUndefined(requestFileSystem)) {
        if( errorCallback ){
            errorCallback();
        }
    }
    else {
        var type = typeof(LocalFileSystem) !== 'undefined' ? LocalFileSystem.PERSISTENT : window.TEMPORARY;
        requestFileSystem(type, util.files.requestedFileSystemSizeBytes, fileSystemObtainedCallback, function (error) {
            util.files.errorCallback(error);
            if (errorCallback) {
                errorCallback(error);
            }
        });
    }
};

util.files.write = function (directory, filename, data, successCallback) {
    var writeData = function (fileEntry) {
        fileEntry.createWriter(function (fileWriter) {
            fileWriter.onerror = util.files.errorCallback;
            fileWriter.onwriteend = successCallback;

            if (Ext.os.is.Linux) {
                var bb = new window.WebKitBlobBuilder();
                bb.append(data);
                fileWriter.write(bb.getBlob('text/plain'));
            }
            else {
                fileWriter.write(data);
            }
        });
    };

    //HTML5 write doesn't overwrite the entire file, so the file has to be deleted before it can be written to cleanly
    var deleteFileAndWrite = function (fileEntry, parentFile) {
        fileEntry.remove(function () {
            parentFile.getFile(filename, {create:true}, writeData);
        }, function(error){
            if( error.code === FileError.NOT_FOUND_ERR ){
                parentFile.getFile(filename, {create:true}, writeData);
            }
        });
    };

    var getFileFromDirectory = function (parentFile) {
        parentFile.getFile(filename, {create:true}, function (fileEntry) {
            deleteFileAndWrite(fileEntry, parentFile)
        }, util.files.errorCallback);
    };

    var fileSystemObtained = function (fileSystem) {
        if (directory !== null) {
            fileSystem.root.getDirectory(directory, {create:true}, function (dirEntry) {
                getFileFromDirectory(dirEntry);
            }, util.files.errorCallback);
        }
        else {
            getFileFromDirectory(fileSystem.root);
        }
    };

    util.files.requestFileSystem(fileSystemObtained);
};

util.files.read = function (directory, filename, successCallback, errorCallback) {
    var fileObtained = function (file) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            successCallback(e.target.result);
        };
        reader.readAsText(file);
    };

    var fileEntryObtained = function (fileEntry) {
        fileEntry.file(fileObtained, errorCallback);
    };

    var fileSystemObtained = function (fileSystem) {
        if (directory !== null) {
            fileSystem.root.getDirectory(directory, {}, function (dirEntry) {
                dirEntry.getFile(filename, {}, fileEntryObtained, errorCallback);
            }, errorCallback);
        }
        else {
            fileSystem.root.getFile(filename, {}, fileEntryObtained, errorCallback);
        }
    };

    util.files.requestFileSystem(fileSystemObtained, errorCallback);
};

util.files.deleteFile = function (directory, filename, successCallback) {
    var deleteFile = function (fileEntry) {
        fileEntry.remove(successCallback, util.files.errorCallback);
    };

    var getFileFromDirectory = function (parentFile) {
        parentFile.getFile(filename, {}, deleteFile, util.files.errorCallback);
    };

    var fileSystemObtained = function (fileSystem) {
        if (directory !== null) {
            fileSystem.root.getDirectory(directory, {create:true}, function (dirEntry) {
                getFileFromDirectory(dirEntry);
            }, util.files.errorCallback);
        }
        else {
            getFileFromDirectory(fileSystem.root);
        }
    };

    util.files.requestFileSystem(fileSystemObtained);
};