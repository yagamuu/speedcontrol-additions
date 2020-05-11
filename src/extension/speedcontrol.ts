import { NodeCG } from './nodecg';

export const speedcontrol = (nodecg: NodeCG): void => {
    const runDataArrayRep = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');
    const currentSurroundingRep = nodecg.Replicant('runDataActiveRunSurrounding', 'nodecg-speedcontrol');
    const currentRunIndexRep = nodecg.Replicant('speedcontrolCurrentRunIndex', {
        defaultValue: 0
    });

    currentSurroundingRep.on('change', (newVal) => {
        if (!runDataArrayRep.value) {
            return;
        }
        const currentRunId = newVal.current;
        const currentRunIndex = runDataArrayRep.value.findIndex((runData) => {
            return runData.id === currentRunId;
        })
        if (currentRunIndex >= 0) {
            currentRunIndexRep.value = currentRunIndex;
        }
    })
}