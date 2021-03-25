<template>
  <div :class="{'has-logo':showLogo}">
    <bar-logo v-if="showLogo" :collapse="isCollapse"></bar-logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuAtiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import BarLogo from './BarLogo'
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'

export default {
  name: 'SideBar',
  components: {
    BarLogo,
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    activeMenu() {
      const router = this.$route
      const {meta, path } = router
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    routes() {
      return this.$router.options.routes
    },
  },
}
</script>
