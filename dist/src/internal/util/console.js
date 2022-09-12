"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableReplWriterShowProxy = exports.isNodeCalledWithoutAScript = void 0;
function isNodeCalledWithoutAScript() {
    var script = process.argv[1];
    return script === undefined || script.trim() === '';
}
exports.isNodeCalledWithoutAScript = isNodeCalledWithoutAScript;
/**
 * Starting at node 10, proxies are shown in the console by default, instead
 * of actually inspecting them. This makes all our lazy loading efforts wicked,
 * so we disable it in polar/register.
 */
function disableReplWriterShowProxy() {
    var repl = require('repl'); // eslint-disable-line @typescript-eslint/no-var-requires
    if (repl.writer.options) {
        Object.defineProperty(repl.writer.options, 'showProxy', {
            value: false,
            writable: false,
            configurable: false
        });
    }
}
exports.disableReplWriterShowProxy = disableReplWriterShowProxy;
