<template>
  <div
    class="playground-holder"
    :class="{ 'playground-holder--card': stack.length > 0 }"
  >
    <ul class="playground-stack">
      <li
        v-for="(item, index) in stack"
        :key="index"
        class="playground-stack-card"
        :style="{ top: getTop(index), zIndex: index }"
      >
        <img :src="getImgUrl(item)" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CardStack',
  props: {
    stack: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getTop(index) {
      return index * 25 + 'px';
    },
    getImgUrl(item) {
      return require(`../assets/svg/card-${item.type}-${item.number}.svg`);
    }
  }
};
</script>
