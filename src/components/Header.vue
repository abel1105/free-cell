<template>
  <div class="header">
    <div class="header-container">
      <h1 class="header-logo">
        <span>FREE</span>
        <span class="header-logoEnd">CELL</span>
      </h1>
      <h1 class="header-timer">{{ clock }}</h1>
      <div class="header-action">
        <div class="header-actionIcon" @click="undo">
          <md-icon>undo</md-icon>
          UNDO
        </div>
        <div class="header-actionIcon" @click="pause">
          <md-icon>pause</md-icon>
          PAUSE
        </div>
        <div class="header-actionIcon" @click="restart">
          <md-icon>autorenew</md-icon>
          RESTART
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: 'Header',
  props: {
    undo: {
      type: Function,
      default: () => {}
    },
    pause: {
      type: Function,
      default: () => {}
    },
    restart: {
      type: Function,
      default: () => {}
    },
    time: {
      type: Number,
      default: 0
    }
  },
  computed: {
    clock() {
      return `${_.padStart(Math.floor(this.time / 60), 2, '0')}:${_.padStart(
        this.time % 60,
        2,
        '0'
      )}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  height: 54px;
  width: 100vw;
  z-index: 1000;
  background: $dark_black;

  &-container {
    max-width: 1106px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  &-logo {
    font-weight: bold;
    font-style: italic;
    color: $green;
    justify-self: start;

    span.header-logoEnd {
      color: $purple;
    }
  }

  &-timer {
    color: $white;
    justify-self: center;
  }

  &-action {
    display: flex;
    align-items: center;
    justify-self: end;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    &Icon {
      margin-right: 25px;
      color: $white;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
