<template>
  <div
    class="playground-holder"
    :class="{ 'playground-holder--card': stack[0].items.length > 0 }"
  >
    <Card :index="-1" :list="stack" :stackIndex="index" />
  </div>
</template>

<script>
export default {
  name: 'CardStack',
  props: {
    index: {
      type: Number,
      default: null
    },
    stack: {
      type: Array,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped></style>
