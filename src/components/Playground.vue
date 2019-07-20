<template>
  <div class="playground">
    <div class="playground-container">
      <template v-for="(type, index) in CARD_TYPES">
        <CardFoundation :key="`foundation_${index}`" :type="type" />
      </template>
      <template v-for="(stack, index) in reserve">
        <CardReserve :key="`reserve_${index}`" :index="index" :stack="stack" />
      </template>
      <template v-for="(stack, index) in stacks">
        <CardStack :key="`stack_${index}`" :index="index" :stack="stack" />
      </template>
    </div>
  </div>
</template>

<script>
import CardStack from '@/components/CardStack';
import { CARD_TYPES, getRandomCardsStack } from '@/helpers/cards';
import CardReserve from '@/components/CardReserve';
import CardFoundation from '@/components/CardFoundation';
export default {
  name: 'Playground',
  components: { CardFoundation, CardReserve, CardStack },
  data() {
    return {
      reserve: [
        [{ items: [] }],
        [{ items: [] }],
        [{ items: [] }],
        [{ items: [] }]
      ],
      stacks: getRandomCardsStack()
    };
  },
  computed: {
    CARD_TYPES() {
      return CARD_TYPES;
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
}
</style>
