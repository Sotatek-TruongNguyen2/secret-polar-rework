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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLAR_SHORT_PARAM_SUBSTITUTIONS = exports.POLAR_PARAM_DEFINITIONS = void 0;
var types = __importStar(require("./argument-types"));
exports.POLAR_PARAM_DEFINITIONS = {
    network: {
        name: "network",
        defaultValue: "default",
        description: "The network to connect to.",
        type: types.string,
        isOptional: true,
        isFlag: false,
        isVariadic: false
    },
    command: {
        name: "command",
        defaultValue: "",
        description: "Name of polar task ran.",
        type: types.string,
        isFlag: false,
        isOptional: true,
        isVariadic: false
    },
    useCheckpoints: {
        name: "useCheckpoints",
        defaultValue: true,
        description: "Specify if checkpoints should be used.",
        type: types.boolean,
        isFlag: true,
        isOptional: true,
        isVariadic: false
    },
    showStackTraces: {
        name: "showStackTraces",
        defaultValue: false,
        description: "Show stack traces.",
        type: types.boolean,
        isFlag: true,
        isOptional: true,
        isVariadic: false
    },
    version: {
        name: "version",
        shortName: "v",
        defaultValue: false,
        description: "Shows version and exit.",
        type: types.boolean,
        isFlag: true,
        isOptional: true,
        isVariadic: false
    },
    help: {
        name: "help",
        shortName: "h",
        defaultValue: false,
        description: "Shows this message, or a task's help if its name is provided",
        type: types.boolean,
        isFlag: true,
        isOptional: true,
        isVariadic: false
    },
    config: {
        name: "config",
        defaultValue: undefined,
        description: "Path to POLAR config file.",
        type: types.inputFile,
        isFlag: false,
        isOptional: true,
        isVariadic: false
    },
    verbose: {
        name: "verbose",
        defaultValue: false,
        description: "Enables verbose logging",
        type: types.boolean,
        isFlag: true,
        isOptional: true,
        isVariadic: false
    }
};
// reverse lookup map for short parameters
exports.POLAR_SHORT_PARAM_SUBSTITUTIONS = Object.entries(exports.POLAR_PARAM_DEFINITIONS)
    .reduce(function (out, kv) {
    var _a = __read(kv, 2), name = _a[0], value = _a[1];
    if (value.shortName) {
        out[value.shortName] = name;
    }
    return out;
}, {});
