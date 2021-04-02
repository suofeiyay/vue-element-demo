<template>
  <div>
    <svg aria-hidden="true" v-on="$listeners" :class="iconClass">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: String,
    iconName: String
  },
  computed: {
    iconName() {
      if(this.iconClass.indexOf('el-icon') <= -1) {
        return '#' + this.iconClass
      }
    },
    isElIcon() {
      if(this.iconClass.indexOf('el-icon') > -1) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
