<template>
  <div class="header">
    <div class="header-container">
      <h1 class="header-logo">
        <span>FREE</span>
        <span class="header-logoEnd">CELL</span>
      </h1>
      <h1 class="header-timer">03:00</h1>
      <div class="header-action">
        <div class="header-actionIcon">
          <md-icon>undo</md-icon>
          UNDO
        </div>
        <div class="header-actionIcon">
          <md-icon>pause</md-icon>
          PAUSE
        </div>
        <div class="header-actionIcon">
          <md-icon>autorenew</md-icon>
          RESTART
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  height: 54px;
  width: 100vw;
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
