"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportProperPrivateKey = void 0;
function supportProperPrivateKey(Assertion) {
    Assertion.addProperty('properPrivateKey', function () {
        var subject = this._obj;
        this.assert(/^0x[0-9-a-fA-F]{64}$/.test(subject), "Expected \"" + subject + "\" to be a proper private key", "Expected \"" + subject + "\" not to be a proper private key", 'proper private key (eg.: 0x123456789012345678901234567890123456789012345678901234567890ffff)', subject);
    });
}
exports.supportProperPrivateKey = supportProperPrivateKey;
