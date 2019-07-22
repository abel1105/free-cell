<template>
  <div
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
    &::before {
      position: absolute;
      content: '';
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 24px;
      height: 24px;
      opacity: 0.2;
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
