import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import store from './store';
import { ReplicantName, SpeedcontrolUserAdditionArray, SpeedcontrolPlayerArray, GoogleApiDefined, CommentatorArray, SpeedcontrolCurrentRunIndex } from '../../nodecg/replicants';
import { SpeedcontrolUserAddition } from '../../nodecg/generated/speedcontrolUserAddition';
import clone from 'clone';

@Module({ dynamic: true, store, name: 'replicant', namespaced: true })
class Replicant extends VuexModule {
    speedcontrolCurrentRunIndex: SpeedcontrolCurrentRunIndex = 0;
    speedcontrolUserAdditionArray: SpeedcontrolUserAdditionArray = [];
    speedcontrolPlayerArray: SpeedcontrolPlayerArray = [];
    googleApiDefined = false;
    commentatorArray: CommentatorArray = [];

    @Mutation
    public updateSpeedcontrolCurrentRunIndex(value: SpeedcontrolCurrentRunIndex): void {
        this.speedcontrolCurrentRunIndex = value;
    }

    @Mutation
    public updateSpeedcontrolUserAdditionArray(value: SpeedcontrolUserAdditionArray): void {
        this.speedcontrolUserAdditionArray = value;
    }
    @Mutation
    public updateSpeedcontrolPlayerArray(value: SpeedcontrolPlayerArray): void {
        this.speedcontrolPlayerArray = value;
    }
    @Mutation
    public updateGoogleApiDefined(value: GoogleApiDefined): void {
        this.googleApiDefined = value;
    }
    @Mutation
    public updateCommentatorArray(value: CommentatorArray): void {
        this.commentatorArray = value;
    }
    
    @Action
    public updateUserAddition({ id, nico, youtube, twitter }: { id: string; nico: string; youtube: string; twitter: string }): void {
        const newUserAddition: SpeedcontrolUserAddition = {
            id,
            social: {
                nico: nico !== '' ? nico : undefined,
                youtube: youtube !== '' ? youtube : undefined,
                twitter: twitter !== '' ? twitter : undefined
            }
        };
        nodecg.sendMessage('updateUserAddition', newUserAddition);
    }
}

export const replicantModule = getModule(Replicant);

const replicantMutations: [ReplicantName, Function][] = [
    ['speedcontrolCurrentRunIndex', replicantModule.updateSpeedcontrolCurrentRunIndex],
    ['speedcontrolUserAdditionArray', replicantModule.updateSpeedcontrolUserAdditionArray],
    ['speedcontrolPlayerArray', replicantModule.updateSpeedcontrolPlayerArray],
    ['googleApiDefined', replicantModule.updateGoogleApiDefined],
    ['commentatorArray', replicantModule.updateCommentatorArray],
];

replicantMutations.forEach(([name, mutator]) => {
    const replicant = nodecg.Replicant(name);

    replicant.on('change', (newVal) => {
        mutator(clone(newVal));
    });
});
