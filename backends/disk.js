var path = require('path');
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

var LoggerStream = require('./logger-stream.js');
var DailyRotateFile = require('../lib/mkdir-daily-rotate-file.js');

function DiskBackend(opts) {
    if (!(this instanceof DiskBackend)) {
        return new DiskBackend(opts);
    }

    if (!opts.folder) {
        throw new Error('DiskBackend: opts.folder is required');
    }

    EventEmitter.call(this);

    this.folder = opts.folder;
}

inherits(DiskBackend, EventEmitter);

DiskBackend.prototype.createStream = function createStream(meta) {
    var fileName = meta.team + '-' + meta.project + '.log';
    var logger = new DailyRotateFile({
        filename: path.join(this.folder, fileName),
        datePattern: '-yyyyMMdd',
        json: false
    });

    return LoggerStream(logger);
};

module.exports = DiskBackend;
