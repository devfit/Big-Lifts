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
util.files.requestedFileSystemSizeBytes = Ext.is.Desktop ? 5 * util.files.KB_PER_MB * util.files.BYTES_PER_KB : 0;
util.files.requestFileSystem = function (fileSystemObtainedCallback) {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    var type = typeof(LocalFileSystem) !== 'undefined' ? LocalFileSystem.PERSISTENT : window.TEMPORARY;
    window.requestFileSystem(type, util.files.requestedFileSystemSizeBytes, fileSystemObtainedCallback, util.files.errorCallback);
};

util.files.write = function (directory, filename, data, successCallback) {
    var writeData = function (fileEntry) {
        fileEntry.createWriter(function (fileWriter) {
            fileWriter.onerror = util.files.errorCallback;
            fileWriter.onwriteend = successCallback;

            if (Ext.is.Desktop) {
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
        }, util.files.errorCallback);
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

util.files.read = function (directory, filename, successCallback) {
    var fileObtained = function (file) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            successCallback(e.target.result);
        };
        reader.readAsText(file);
    };

    var fileEntryObtained = function (fileEntry) {
        fileEntry.file(fileObtained);
    };

    var fileSystemObtained = function (fileSystem) {
        if (directory !== null) {
            fileSystem.root.getDirectory(directory, {}, function (dirEntry) {
                dirEntry.getFile(filename, {}, fileEntryObtained, util.files.errorCallback);
            });
        }
        else {
            fileSystem.root.getFile(filename, {}, fileEntryObtained, util.files.errorCallback);
        }
    };

    util.files.requestFileSystem(fileSystemObtained);
};