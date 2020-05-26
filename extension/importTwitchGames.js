"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var helper_1 = require("./lib/helper");
// eslint-disable-next-line @typescript-eslint/camelcase
exports.importTwitchGames = function (nodecg, spreadsheet) {
    var logger = new nodecg.Logger(nodecg.bundleName + ":import-twitch-games");
    var speedcontrolRunDataArrayRep = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');
    var importTwitchGamesFromSpreadsheet = function (url, sheetName, lineIdIndex, gameNameIndex) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var spreadsheetId, valueResponse, runDataArray, twitchGames;
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
                    runDataArray = speedcontrolRunDataArrayRep.value;
                    if (!valueResponse.data.values || !runDataArray) {
                        return [2 /*return*/, false];
                    }
                    twitchGames = valueResponse.data.values.filter(function (_, index) {
                        return index !== 0;
                    }).map(function (values) {
                        return {
                            id: values[lineIdIndex],
                            game: values[gameNameIndex]
                        };
                    });
                    speedcontrolRunDataArrayRep.value = runDataArray.map(function (runData) {
                        var twitchGame = twitchGames.find(function (game) {
                            return game.id === runData.externalID;
                        });
                        if (twitchGame) {
                            return Object.assign({}, runData, { gameTwitch: twitchGame.game });
                        }
                        return runData;
                    });
                    return [2 /*return*/, true];
            }
        });
    }); };
    nodecg.listenFor('importTwitchGamesFromSpreadsheet', function (_a, ack) {
        var url = _a.url, sheetName = _a.sheetName, lineIdIndex = _a.lineIdIndex, gameNameIndex = _a.gameNameIndex;
        try {
            ack(null, importTwitchGamesFromSpreadsheet(url, sheetName, lineIdIndex, gameNameIndex));
        }
        catch (err) {
            logger.error(err);
            ack(err);
        }
    });
};
