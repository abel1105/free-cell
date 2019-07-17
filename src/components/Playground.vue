<template>
  <div class="playground">
    <div class="playground-container">
      <div class="playground-reserve playground-reserve--card">
        <img src="../assets/svg/card-club-1.svg" />
      </div>
      <div class="playground-reserve"></div>
      <div class="playground-reserve"></div>
      <div class="playground-reserve"></div>
      <div class="playground-foundation playground-foundation--card">
        <img src="../assets/svg/card-club-1.svg" />
      </div>
      <div class="playground-foundation"></div>
      <div class="playground-foundation"></div>
      <div class="playground-foundation"></div>
      <template v-for="(item, index) in stacks">
        <CardStack :key="index" :stack="item" />
      </template>
    </div>
  </div>
</template>

<script>
import CardStack from '@/components/CardStack';
export default {
  name: 'Playground',
  components: { CardStack },
  computed: {
    stacks() {
      return this.$store.state.stacks;
    }
  }
};
</script>

<style lang="scss">
.playground {
  padding-top: 54px;
  width: 100vw;
  height: 100vh;

  &-container {
    max-width: 1106px;
    margin: 30px auto 0;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-column-gap: 48px;
    grid-row-gap: 30px;
  }

  &-reserve,
  &-foundation,
  &-holder {
    padding-top: 173px / 112px * 100%;
    width: 100%;
    border-radius: 4px;
    background: $white_08;
    position: relative;

    &--card {
      padding-top: unset;
    }
  }

  &-reserve {
    &::after {
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
      &::after {
        background: url('../assets/svg/spade-24px-white.svg');
      }
    }
    &:nth-child(2) {
      &::after {
        background: url('../assets/svg/heart-24px-white.svg');
      }
    }
    &:nth-child(3) {
      &::after {
        background: url('../assets/svg/club-24px-white.svg');
      }
    }
    &:nth-child(4) {
      &::after {
        background: url('../assets/svg/diamond-24px-white.svg');
      }
    }
  }

  &-stack {
    margin: 0;
    padding: 0;
    position: relative;

    &-card {
      position: absolute;
    }
  }
}
</style>
