<template>
  <div>
    <Header :undo="undo" :time="time" :pause="stopClock" :restart="restart" />
    <div class="playground">
      <div class="playground-container">
        <template v-for="(type, index) in CARD_TYPES">
          <CardFoundation :key="`foundation_${index}`" :type="type" />
        </template>
        <template v-for="(stack, index) in reserve">
          <CardReserve
            :key="`reserve_${index}`"
            :index="index"
            :stack="stack"
            :on-change="onChange"
          />
        </template>
        <template v-for="(stack, index) in stacks">
          <CardStack
            :key="`stack_${index}`"
            :index="index"
            :stack="stack"
            :on-change="onChange"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import CardStack from '@/components/CardStack';
import { CARD_TYPES, getRandomCardsStack } from '@/helpers/cards';
import CardReserve from '@/components/CardReserve';
import CardFoundation from '@/components/CardFoundation';
import Header from '@/components/Header';
export default {
  name: 'Playground',
  components: { Header, CardFoundation, CardReserve, CardStack },
  data() {
    return {
      reserve: [
        [{ items: [] }],
        [{ items: [] }],
        [{ items: [] }],
        [{ items: [] }]
      ],
      stacks: getRandomCardsStack(),
      isNewLog: true,
      time: 0,
      timer: null
    };
  },
  mounted() {
    this.onChange();
  },
  computed: {
    CARD_TYPES() {
      return CARD_TYPES;
    }
  },
  methods: {
    startClock() {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.time = this.time + 1;
        }, 1000);
      }
    },
    stopClock() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    onChange: _.debounce(function() {
      this.startClock();
      this.isNewLog = true;
      this.$store.commit('addLog', JSON.stringify(this.$data));
    }, 400),
    undo() {
      const lastLog = this.$store.getters.lastLog;
      if (!lastLog) return false;

      this.$store.commit('setLog', {
        foundation: JSON.parse(lastLog.foundation)
      });
      const { reserve, stacks } = JSON.parse(lastLog.data);
      this.reserve = reserve;
      this.stacks = stacks;
      // to undo again due to log is created after made
      if (this.isNewLog) {
        this.isNewLog = false;
        this.undo();
        this.onChange();
      }
    },
    restart() {
      this.stopClock();
      this.reserve = [
        [{ items: [] }],
        [{ items: [] }],
        [{ items: [] }],
        [{ items: [] }]
      ];
      this.stacks = getRandomCardsStack();
      this.isNewLog = true;
      this.time = 0;
      this.timer = null;
      this.$store.commit('restart');
      this.$nextTick(() => {
        this.onChange();
      });
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
