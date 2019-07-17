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
  components: { Playground, Header }
};
</script>

<style></style>
