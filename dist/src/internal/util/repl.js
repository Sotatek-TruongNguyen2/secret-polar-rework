"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRecoverableError = exports.preprocess = exports.disableReplWriterShowProxy = exports.isNodeCalledWithoutAScript = void 0;
function isNodeCalledWithoutAScript() {
    var script = process.argv[1];
    return script === undefined || script.trim() === "";
}
exports.isNodeCalledWithoutAScript = isNodeCalledWithoutAScript;
/**
 * Starting at node 10, proxies are shown in the console by default, instead
 * of actually inspecting them. This makes all our lazy loading efforts wicked,
 * so we disable it in register.
 */
function disableReplWriterShowProxy() {
    var repl = require("repl"); // eslint-disable-line @typescript-eslint/no-var-requires
    if (repl.writer.options != null) {
        Object.defineProperty(repl.writer.options, "showProxy", {
            value: false,
            writable: false,
            configurable: false
        });
    }
}
exports.disableReplWriterShowProxy = disableReplWriterShowProxy;
// handle top level await
function preprocess(input) {
    var awaitMatcher = /^(?:\s*(?:(?:let|var|const)\s)?\s*([^=]+)=\s*|^\s*)(await\s[\s\S]*)/;
    var asyncWrapper = function (code, binder) {
        var assign = binder ? "global." + binder + " = " : '';
        return "(function(){ async function _wrap() { return " + assign + code + " } return _wrap();})()";
    };
    // match & transform
    var match = input.match(awaitMatcher);
    if (match) {
        input = "" + asyncWrapper(match[2], match[1]);
    }
    return input;
}
exports.preprocess = preprocess;
// check if repl error is recoverable
function isRecoverableError(error) {
    if (error.name === 'SyntaxError') {
        return /^(Unexpected end of input|Unexpected token)/.test(error.message);
    }
    return false;
}
exports.isRecoverableError = isRecoverableError;
