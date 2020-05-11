<template>
  <v-app :style="{minHeight: '520px'}">
    <transition name="view-transition">
      <commentator-modification-form v-if="isModification"></commentator-modification-form>
      <div v-else>
        <div class="ma-2">
          Add commentator's information in speedcontrol bundle.
        </div>
        <div :style="{height: '480px',overflowY: 'scroll'}">
          <commentator-list></commentator-list>
        </div>
        <v-btn
          class="my-2"
          block
          color="success"
        >
          Add Commentator
        </v-btn>
      </div>
    </transition>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { commentatorModificationModule as commentatorModification, transitionStatus } from './commentatorModification';
import CommentatorList from './components/CommentatorList.vue';
import CommentatorModificationForm from './components/CommentatorModificationForm.vue';

@Component({
  components: {
    CommentatorList,
    CommentatorModificationForm
  }
})
export default class App extends Vue {
  get isModification(): boolean {
    if (commentatorModification.transition === transitionStatus.modificationForm) {
      return true;
    }
    return false;
  }
}
</script>

<style scoped>
  .view-transition-enter-active {
    transition: all .5s;
  }

  .view-transition-enter, .view-transition-leave {
    opacity: 0;
    transform: translateY(10px);
  }
</style>