import { VuexModule, Module, Action, getModule, Mutation } from 'vuex-module-decorators';
import store from '../../plugin/store';
import { Commentator } from '../../../nodecg/generated/commentator';

export enum transitionStatus {
    userPanel,
    modificationForm
}

@Module({ dynamic: true, store, name: 'commentatorModification', namespaced: true })
class CommentatorModification extends VuexModule {
    transition = transitionStatus.userPanel;
    name = '';
    id = '';
    nico = '';
    youtube = '';
    twitter = '';
    assignedRunIdArray: string[] = [];

    @Mutation
    public updateModifyCommentator(commentator: Commentator): void {
        this.name = commentator.name;
        this.id = commentator.id;
        this.nico = commentator.social.nico || '';
        this.youtube = commentator.social.youtube || '';
        this.twitter = commentator.social.twitter || '';
        this.assignedRunIdArray = commentator.assignedRunIdArray;
    }

    @Mutation
    public closeModificationForm(): void {
        this.transition = transitionStatus.userPanel;
    }

    @Mutation
    public openModificationForm(): void {
        this.transition = transitionStatus.modificationForm;
    }

    @Action
    public transitionToModification(commentator: Commentator): void {
        this.updateModifyCommentator(commentator);
        this.openModificationForm();
    }

    @Action
    public transitionToCreation(): void {
        this.updateModifyCommentator({
            name: '',
            id: '',
            assignedRunIdArray: [],
            social: {}
        });
        this.openModificationForm();
    }

    @Action
    public transitionToUserPanel(): void {
        this.closeModificationForm();
    }
}

export const commentatorModificationModule = getModule(CommentatorModification);