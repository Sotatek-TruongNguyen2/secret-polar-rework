"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a = require("chai"), expect = _a.expect, use = _a.use;
var _b = require("secret-polar"), Contract = _b.Contract, getAccountByName = _b.getAccountByName, polarChai = _b.polarChai;
use(polarChai);
describe("sample_project", function () {
    function setup() {
        return __awaiter(this, void 0, void 0, function () {
            var contract_owner, other, contract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contract_owner = getAccountByName("account_1");
                        other = getAccountByName("account_0");
                        contract = new Contract("sample-project");
                        return [4 /*yield*/, contract.parseSchema()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { contract_owner: contract_owner, other: other, contract: contract }];
                }
            });
        });
    }
    it("deploy and init", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, contract_owner, other, contract, deploy_response, contract_info;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), contract_owner = _a.contract_owner, other = _a.other, contract = _a.contract;
                    return [4 /*yield*/, contract.deploy(contract_owner)];
                case 2:
                    deploy_response = _b.sent();
                    return [4 /*yield*/, contract.instantiate({ "count": 102 }, "deploy test", contract_owner)];
                case 3:
                    contract_info = _b.sent();
                    return [4 /*yield*/, expect(contract.query.get_count()).to.respondWith({ 'count': 102 })];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("unauthorized reset", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, contract_owner, other, contract, deploy_response, contract_info;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), contract_owner = _a.contract_owner, other = _a.other, contract = _a.contract;
                    return [4 /*yield*/, contract.deploy(contract_owner)];
                case 2:
                    deploy_response = _b.sent();
                    return [4 /*yield*/, contract.instantiate({ "count": 102 }, "deploy test", contract_owner)];
                case 3:
                    contract_info = _b.sent();
                    return [4 /*yield*/, expect(contract.tx.reset({ account: other }, { "count": 100 })).to.be.revertedWith("unauthorized")];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, expect(contract.query.get_count()).not.to.respondWith({ 'count': 100 })];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("increment", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, contract_owner, other, contract, deploy_response, contract_info, ex_response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setup()];
                case 1:
                    _a = _b.sent(), contract_owner = _a.contract_owner, other = _a.other, contract = _a.contract;
                    return [4 /*yield*/, contract.deploy(contract_owner)];
                case 2:
                    deploy_response = _b.sent();
                    return [4 /*yield*/, contract.instantiate({ "count": 102 }, "deploy test", contract_owner)];
                case 3:
                    contract_info = _b.sent();
                    return [4 /*yield*/, contract.tx.increment({ account: contract_owner })];
                case 4:
                    ex_response = _b.sent();
                    return [4 /*yield*/, expect(contract.query.get_count()).to.respondWith({ 'count': 103 })];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
