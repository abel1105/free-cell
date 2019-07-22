<template>
  <div
    class="playground-reserve"
    :class="{ 'playground-reserve--card': stack[0].items.length > 0 }"
  >
    <Card
      :index="-1"
      :list="stack"
      :stackIndex="index"
      :is-reserve="true"
      :on-change="onChange"
    />
  </div>
</template>

<script>
export default {
  name: 'CardReserve',
  props: {
    index: {
      type: Number,
      default: null
    },
    stack: {
      type: Array,
      default: null
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
.playground {
  &-reserve {
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
