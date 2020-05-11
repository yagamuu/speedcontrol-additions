"use strict";
var speedcontrolUserAddition_1 = require("./speedcontrolUserAddition");
var spreadsheet_1 = require("./spreadsheet");
var speedcontrol_1 = require("./speedcontrol");
module.exports = function (nodecg) {
    speedcontrolUserAddition_1.speedcontrolUserAddition(nodecg);
    spreadsheet_1.spreadsheet(nodecg);
    speedcontrol_1.speedcontrol(nodecg);
};
