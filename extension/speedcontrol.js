"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.speedcontrol = void 0;
var speedcontrol = function (nodecg) {
    var additionsNodecg = nodecg;
    var speedcontrolNodecg = nodecg;
    var runDataArrayRep = speedcontrolNodecg.Replicant('runDataArray', 'nodecg-speedcontrol');
    var currentSurroundingRep = speedcontrolNodecg.Replicant('runDataActiveRunSurrounding', 'nodecg-speedcontrol');
    var currentRunIndexRep = additionsNodecg.Replicant('speedcontrolCurrentRunIndex', {
        defaultValue: 0
    });
    currentSurroundingRep.on('change', function (newVal) {
        if (!runDataArrayRep.value) {
            return;
        }
        var currentRunId = newVal.current;
        var currentRunIndex = runDataArrayRep.value.findIndex(function (runData) {
            return runData.id === currentRunId;
        });
        if (currentRunIndex >= 0) {
            currentRunIndexRep.value = currentRunIndex;
        }
    });
};
exports.speedcontrol = speedcontrol;
