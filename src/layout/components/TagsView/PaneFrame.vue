<template>
  <div class="pane-container">
    <i class="el-icon-arrow-left el-icon--left" v-if="isScroll" @click="scrollLeft"></i>
    <slot />
    <i class="el-icon-arrow-right el-icon--right" v-if="isScroll" @click="scrollRight"></i>
  </div>
</template>

<script>
export default {
  name: 'PaneFrame',
  props: {
    isScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollLeft: function() {
      console.log('left')
    },
    scrollRight: function() {
      console.log('right')
    }
  },
}
</script>

<style lang='scss' scoped>
</style>
