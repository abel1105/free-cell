<template>
  <draggable
    class="card-wrapper"
    :data-index="index"
    :data-isReserve="isReserve"
    :data-isClear="isClear"
    :data-stackIndex="stackIndex"
    :data-parentType="parentType"
    :data-parentNumber="parentNumber"
    :class="{
      'card-wrapper--first': index === 0,
      'card-wrapper--last': list.length === 0 && (isDragging || onDragging),
      'card-wrapper--drag': onDragging
    }"
    :style="{
      'padding-top': getTop
    }"
    ghost-class="card--ghost"
    group="list"
    :list="list"
    tag="ul"
    :disabled="isLock || !isDraggable"
    :fallback-tolerance="10"
    @start="dragStart"
    @end="dragEnd"
    @change="onChange"
    :move="move"
  >
    <li
      v-for="(item, i) in list"
      :key="i"
      class="card"
      :class="{ 'card--last': !isMoreCardBehind }"
    >
      <template v-if="item.number">
        <img
          ref="cardImg"
          class="card-img"
          :class="{ 'card-img--noDrag': !isDraggable }"
          v-if="isLastOne"
          :src="getImgUrl(item)"
        />
        <div
          :class="{ 'card-img--noDrag': !isDraggable }"
          v-else
          class="card-imgBg"
        >
          <img :src="getImgUrl(item)" />
        </div>
      </template>
      <Card
        v-if="isMoreCardBehind"
        :index="index + 1"
        :list="item.items"
        :parent-type="item.type"
        :parent-number="item.number"
        :stack-index="stackIndex"
        :is-reserve="isReserve"
        :is-clear="isClear"
        :on-change="onChange"
      />
    </li>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import { isDraggable, isMatch } from '@/helpers/cards';
export default {
  name: 'Card',
  components: { draggable },
  data() {
    return {
      onDragging: false
    };
  },
  props: {
    list: {
      required: false,
      type: Array,
      default: null
    },
    index: {
      type: Number,
      default: 0
    },
    stackIndex: {
      type: Number,
      default: null
    },
    parentType: {
      type: String,
      default: null
    },
    parentNumber: {
      type: Number,
      default: null
    },
    isReserve: {
      type: Boolean,
      default: false
    },
    isClear: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  mounted() {
    this.checkFoundation();
  },
  updated() {
    this.checkFoundation();
  },
  watch: {
    foundationValue() {
      this.checkFoundation();
    }
  },
  computed: {
    isLastOne() {
      if (this.list.length) {
        if (this.list[0]) {
          if (this.list[0].items.length === 0) {
            return true;
          }
        }
      }
      return false;
    },
    isMoreCardBehind() {
      return !!this.list[0] && !!this.list[0].items;
    },
    getTop() {
      if (this.list.length !== 0 && this.list[0].items.items) return 0;

      return `${this.index * 25}px`;
    },
    isDraggable() {
      return isDraggable(this.list);
    },
    isDragging() {
      return this.$store.state.isDragging;
    },
    isLock() {
      return this.$store.state.isLock;
    },
    foundationValue() {
      if (this.list[0]) {
        return this.$store.state.foundation[this.list[0].type];
      }
      return null;
    }
  },
  methods: {
    getImgUrl(item) {
      return require(`../assets/svg/card-${item.type}-${item.number}.svg`);
    },
    dragStart() {
      this.onDragging = true;
      this.$store.commit('toggleIsDragging');
    },
    dragEnd() {
      this.onDragging = false;
      this.$store.commit('toggleIsDragging');
    },
    move(evt) {
      // console.log(evt.draggedContext, evt.relatedContext);
      const { element: origin, futureIndex } = evt.draggedContext;
      const {
        list: targetList,
        component: targetComponent
      } = evt.relatedContext;

      const attrs = targetComponent.$attrs;

      if (attrs['data-isClear']) {
        if (origin.number === 13) {
          return true;
        }
        return false;
      }
      // the same
      if (targetList[0] === origin) {
        return true;
      }
      // when is reserve
      if (attrs['data-isReserve']) {
        // stop it if origin has more than one
        if (origin.items && origin.items.length !== 0) {
          return false;
        }
        // stop it if already have card
        if (targetList.length !== 0 || attrs['data-parentType']) {
          return false;
        }
        return true;
      }

      // future index should always be 0
      if (futureIndex !== 0) {
        return false;
      }

      // future should be the last item
      if (targetList.length !== 0) {
        return false;
      }

      const target = {
        type: attrs['data-parentType'],
        number: attrs['data-parentNumber']
      };
      if (!isMatch(target, origin)) {
        return false;
      }
    },
    checkFoundation() {
      if (this.isLastOne && this.list[0]) {
        const { type, number } = this.list[0];
        if (
          !this.isLock &&
          this.$store.state.foundation[type] + 1 === number &&
          this.$refs.cardImg[0]
        ) {
          this.$store.commit('toggleIsLock');
          const {
            x: sourceX,
            y: sourceY
          } = this.$refs.cardImg[0].getBoundingClientRect();
          const { x: targetX, y: targetY } = document
            .getElementById(`foundation_${type}`)
            .getBoundingClientRect();
          this.$refs.cardImg[0].style.transform = `translate(${targetX -
            sourceX}px, ${targetY - sourceY}px)`;

          // after transition
          setTimeout(() => {
            this.list.splice(0, 1);
            this.$store.commit('toggleIsLock');
            this.$store.commit('setFoundation', type);
          }, 500);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  &-wrapper {
    list-style-type: none;
    margin: 0;
    padding: 0;

    &--first {
      position: absolute;
      min-height: 100%;
      width: 100%;
      top: 0;
    }

    &--last {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
    }

    &--drag {
      padding-bottom: 154.4642857143%;
    }

    &:not(.card-wrapper--last) {
      padding-top: 0 !important;
    }
  }

  &-img--noDrag,
  &-img--noDrag * {
    -moz-user-select: none; /* These user-select properties are inheritable, used to prevent text selection */
    -webkit-user-select: none;
    -ms-user-select: none; /* From IE10 only */
    user-select: none; /* Not valid CSS yet, as of July 2012 */

    -webkit-user-drag: none; /* Prevents dragging of images/divs etc */
    user-drag: none;
  }

  &-img {
    transition: all 0.5s;
  }

  &-imgBg {
    width: 100%;
    height: 25px;
  }

  &--ghost {
    z-index: 1000;
  }
}
</style>
