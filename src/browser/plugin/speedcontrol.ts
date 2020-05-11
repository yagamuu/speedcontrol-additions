import { VuexModule, getModule, Module, Mutation } from 'vuex-module-decorators';
import store from './store';
import { SpeedcontrolReplicantName, RunDataArray, Timer } from '../../nodecg/speedcontrol';
import clone from 'clone';

export interface SpeedcontrolReplicantState {
    runDataArray: RunDataArray;
}

@Module({ dynamic: true, store, name: 'speedcontrol', namespaced: true })
class Speedcontrol extends VuexModule implements SpeedcontrolReplicantState {
    runDataArray: RunDataArray = [];
    timer: Timer = {};

    @Mutation
    public updateRunDataArray (value: RunDataArray): void {
        this.runDataArray = value;
    }

    @Mutation
    public updateTimer (value: Timer): void {
        this.timer = value;
    }
}

export const speedcontrolModule = getModule(Speedcontrol);

const speedcontrolMutations: [SpeedcontrolReplicantName, Function][] = [
    ['runDataArray', speedcontrolModule.updateRunDataArray],
    ['timer', speedcontrolModule.updateTimer]
];

speedcontrolMutations.forEach(([name, mutator]) => {
    const replicant = nodecg.Replicant(name, 'nodecg-speedcontrol');

    replicant.on('change', (newVal) => {
        mutator(clone(newVal));
    });
});
