<template>
  <div
    :id="`foundation_${this.type}`"
    class="playground-foundation"
    :class="{ 'playground-foundation--card': number !== 0 }"
  >
    <img v-if="number" :src="url" />
  </div>
</template>

<script>
export default {
  name: 'CardFoundation',
  props: {
    type: {
      type: String,
      default: null
    }
  },
  computed: {
    number() {
      return this.$store.state.foundation[this.type];
    },
    url() {
      return require(`../assets/svg/card-${this.type}-${this.number}.svg`);
    }
  }
};
</script>

<style lang="scss" scoped>
.playground {
  &-foundation {
    &,
    & * {
      -moz-user-select: none; /* These user-select properties are inheritable, used to prevent text selection */
      -webkit-user-select: none;
      -ms-user-select: none; /* From IE10 only */
      user-select: none; /* Not valid CSS yet, as of July 2012 */

      -webkit-user-drag: none; /* Prevents dragging of images/divs etc */
      user-drag: none;
    }

    &::before {
      position: absolute;
      content: '';
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 24px;
      height: 24px;
      opacity: 0.2;
      z-index: -1;
    }

    &:nth-child(1) {
      &::before {
        background: url('../assets/svg/spade-24px-white.svg');
      }
    }
    &:nth-child(2) {
      &::before {
        background: url('../assets/svg/heart-24px-white.svg');
      }
    }
    &:nth-child(3) {
      &::before {
        background: url('../assets/svg/club-24px-white.svg');
      }
    }
    &:nth-child(4) {
      &::before {
        background: url('../assets/svg/diamond-24px-white.svg');
      }
    }
  }
}
</style>
