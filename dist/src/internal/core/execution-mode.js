"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExecutionMode = exports.ExecutionMode = void 0;
var debug_1 = __importDefault(require("debug"));
var findUp = __importStar(require("find-up"));
var path = __importStar(require("path"));
var log = debug_1.default("polar:core:execution-mode");
/**
 * This module defines different polar execution modes and autodetects them.
 *
 * IMPORTANT: This will have to be revisited once Yarn PnP and npm's tink get
 * widely adopted.
 */
var ExecutionMode;
(function (ExecutionMode) {
    ExecutionMode[ExecutionMode["EXECUTION_MODE_TS_NODE_TESTS"] = 0] = "EXECUTION_MODE_TS_NODE_TESTS";
    ExecutionMode[ExecutionMode["EXECUTION_MODE_LINKED"] = 1] = "EXECUTION_MODE_LINKED";
    ExecutionMode[ExecutionMode["EXECUTION_MODE_GLOBAL_INSTALLATION"] = 2] = "EXECUTION_MODE_GLOBAL_INSTALLATION";
    ExecutionMode[ExecutionMode["EXECUTION_MODE_LOCAL_INSTALLATION"] = 3] = "EXECUTION_MODE_LOCAL_INSTALLATION";
})(ExecutionMode = exports.ExecutionMode || (exports.ExecutionMode = {}));
var workingDirectoryOnLoad = process.cwd();
function getExecutionMode() {
    var isInstalled = __filename.includes("node_modules");
    if (!isInstalled) {
        // When running the tests with ts-node we set the CWD to the root of
        // polar. We could check if the __filename ends with .ts
        if (__dirname.startsWith(workingDirectoryOnLoad)) {
            return ExecutionMode.EXECUTION_MODE_TS_NODE_TESTS;
        }
        return ExecutionMode.EXECUTION_MODE_LINKED;
    }
    try {
        if (require("is-installed-globally") == null) {
            return ExecutionMode.EXECUTION_MODE_GLOBAL_INSTALLATION;
        }
    }
    catch (error) {
        log("Failed to load is-installed-globally. Using alternative local installation detection\n", error);
        if (!alternativeIsLocalInstallation()) {
            return ExecutionMode.EXECUTION_MODE_GLOBAL_INSTALLATION;
        }
    }
    return ExecutionMode.EXECUTION_MODE_LOCAL_INSTALLATION;
}
exports.getExecutionMode = getExecutionMode;
/**
 * This is a somewhat more limited detection, but we use it if
 * is-installed-globally fails.
 *
 * If a user installs polar locally, and executes it from outside the
 * directory that contains the `node_module` with the installation, this will
 * fail and return `false`.
 */
function alternativeIsLocalInstallation() {
    var cwd = workingDirectoryOnLoad;
    while (true) {
        var nodeModules = findUp.sync("node_modules", { cwd: cwd });
        if (nodeModules === null || nodeModules === undefined) {
            return false;
        }
        if (__dirname.startsWith(nodeModules)) {
            return true;
        }
        cwd = path.join(nodeModules, "..", "..");
    }
}
