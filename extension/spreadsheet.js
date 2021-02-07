"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spreadsheet = void 0;
var tslib_1 = require("tslib");
var googleapis_1 = require("googleapis");
var importUserAddition_1 = require("./importUserAddition");
var importCommentator_1 = require("./importCommentator");
var helper_1 = require("./lib/helper");
var importTwitchGames_1 = require("./importTwitchGames");
var spreadsheet = function (nodecg) {
    var logger = new nodecg.Logger(nodecg.bundleName + ":spreadsheet");
    var googleApiDefinedRep = nodecg.Replicant('googleApiDefined', { defaultValue: false });
    var googleApiKey = nodecg.bundleConfig.googleApiKey;
    if (!googleApiKey) {
        logger.warn('Google API Key is undefined.');
    }
    googleApiDefinedRep.value = true;
    var spreadsheet = googleapis_1.google.sheets({
        version: 'v4',
        auth: googleApiKey
    });
    var loadSpreadsheet = function (url, ack) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var spreadsheetId, spreadsheetBasis, sheetTitles_1, ranges, sheetResponse, sheetArray, err_1;
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    spreadsheetId = helper_1.googleSpreadsheetUrlToId(url);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    if (spreadsheetId === '') {
                        throw new Error('Spreadsheet URL is invalid.');
                    }
                    return [4 /*yield*/, spreadsheet.spreadsheets.get({
                            spreadsheetId: spreadsheetId
                        })];
                case 2:
                    spreadsheetBasis = _c.sent();
                    sheetTitles_1 = (_a = spreadsheetBasis.data.sheets) === null || _a === void 0 ? void 0 : _a.map(function (sheet) {
                        return sheet.properties ? sheet.properties.title || '' : '';
                    }).filter(function (title) {
                        return title !== '';
                    });
                    if (!sheetTitles_1) {
                        throw new Error('Failed to load from spreadsheet.');
                    }
                    ranges = sheetTitles_1.map(function (title) {
                        return title + "!1:1";
                    });
                    return [4 /*yield*/, spreadsheet.spreadsheets.values.batchGet({
                            spreadsheetId: spreadsheetId,
                            ranges: ranges
                        })];
                case 3:
                    sheetResponse = _c.sent();
                    if (!sheetResponse.data.valueRanges) {
                        throw new Error('Failed to get response from spreadsheet.');
                    }
                    sheetArray = (_b = sheetResponse.data.valueRanges) === null || _b === void 0 ? void 0 : _b.map(function (values, index) {
                        var columns = values.values ? values.values[0] : [];
                        return {
                            name: sheetTitles_1[index],
                            columns: columns
                        };
                    });
                    ack(null, sheetArray);
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _c.sent();
                    logger.error(err_1);
                    ack(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    nodecg.listenFor('loadSheetsFromSpreadsheet', loadSpreadsheet);
    importUserAddition_1.importUserAddition(nodecg, spreadsheet);
    importCommentator_1.importCommentator(nodecg, spreadsheet);
    importTwitchGames_1.importTwitchGames(nodecg, spreadsheet);
};
exports.spreadsheet = spreadsheet;
