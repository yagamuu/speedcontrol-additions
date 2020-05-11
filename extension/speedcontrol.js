"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.speedcontrol = function (nodecg) {
    var runDataArrayRep = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');
    var currentSurroundingRep = nodecg.Replicant('runDataActiveRunSurrounding', 'nodecg-speedcontrol');
    var currentRunIndexRep = nodecg.Replicant('speedcontrolCurrentRunIndex', {
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
