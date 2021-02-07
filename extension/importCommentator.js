"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCommentator = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("uuid");
var helper_1 = require("./lib/helper");
// eslint-disable-next-line @typescript-eslint/camelcase
var importCommentator = function (nodecg, spreadsheet) {
    var logger = new nodecg.Logger(nodecg.bundleName + ":import-commentator");
    var commentatorArrayRep = nodecg.Replicant('commentatorArray', {
        defaultValue: []
    });
    var importCommentatorFromSpreadsheet = function (url, sheetName, runIdIndex, nameIndex, twitchIndex, nicoIndex, youtubeIndex, twitterIndex) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var spreadsheetId, valueResponse, commentatorArray;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spreadsheetId = helper_1.googleSpreadsheetUrlToId(url);
                    return [4 /*yield*/, spreadsheet.spreadsheets.values.get({
                            spreadsheetId: spreadsheetId,
                            range: sheetName
                        })];
                case 1:
                    valueResponse = _a.sent();
                    if (!valueResponse.data.values) {
                        return [2 /*return*/, false];
                    }
                    commentatorArray = valueResponse.data.values.filter(function (_, index) {
                        return index !== 0;
                    }).map(function (values) {
                        var runIdValue = values[runIdIndex];
                        return {
                            id: uuid_1.v4(),
                            assignedRunIdArray: runIdValue !== '' ? runIdValue.split(',').map(function (val) { return val.trim(); }) : [],
                            name: values[nameIndex] !== '' ? values[nameIndex] : undefined,
                            social: {
                                twitch: values[twitchIndex] !== '' ? values[twitchIndex] : undefined,
                                nico: values[nicoIndex] !== '' ? values[nicoIndex] : undefined,
                                youtube: values[youtubeIndex] !== '' ? values[youtubeIndex] : undefined,
                                twitter: values[twitterIndex] !== '' ? values[twitterIndex] : undefined
                            }
                        };
                    });
                    commentatorArrayRep.value = commentatorArray;
                    return [2 /*return*/, true];
            }
        });
    }); };
    nodecg.listenFor('importCommentatorFromSpreadsheet', function (_a, ack) {
        var url = _a.url, sheetName = _a.sheetName, indexes = _a.indexes;
        try {
            ack(null, importCommentatorFromSpreadsheet(url, sheetName, indexes.runId, indexes.name, indexes.twitch, indexes.nico, indexes.youtube, indexes.twitter));
        }
        catch (err) {
            logger.error(err);
            ack(err);
        }
    });
};
exports.importCommentator = importCommentator;
