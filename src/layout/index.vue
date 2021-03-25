<template>
  <div :class="classObj" class="app-wrapper">
    <side-bar class="sidebar-container" />
    <div :class="{'hasTagsView':needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <nav-bar></nav-bar>
         <tags-view v-if="needTagsView" />
      </div>
      <main-page />
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar'
import MainPage from './components/MainPage'
import NavBar from './components/NavBar'
import TagsView from './components/TagsView'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    SideBar,
    MainPage,
    NavBar,
    TagsView
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      fixedHeader: state => state.settings.fixedHeader,
      needTagsView: state => state.settings.tagsView,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
</style>
