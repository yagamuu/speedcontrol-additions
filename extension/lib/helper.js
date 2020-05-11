"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
exports.googleSpreadsheetUrlToId = function (url) {
    var spreadSheetUrl = new url_1.URL(url);
    var pathNames = spreadSheetUrl.pathname.split('/');
    // pathName must be '[0]/spreadsheets'[1]/'d'[2]/<spreadsheet id>[3]
    return pathNames[3] || '';
};
