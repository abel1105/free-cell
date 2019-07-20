<template>
  <div class="home">
    <Header />
    <Playground />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Playground from '@/components/Playground';
export default {
  name: 'home',
  components: { Playground, Header },
  mounted() {
    document.addEventListener('dragstart', e => {
      // e.preventDefault();
      e.stopPropagation();
    });
  }
};
</script>

<style></style>
