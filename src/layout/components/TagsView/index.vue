<template>
  <div class="tag-view-container">
    <pane-frame>
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </pane-frame>
  </div>
</template>

<script>
import PaneFrame from './PaneFrame'
import path from 'path'
export default {
  name: 'TagsView',
  components: {
    PaneFrame
  },
  data() {
    return {
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive: function(route) {
      return route.path == this.$route.path
    },
    isAffix: function(tag) {
      return tag.meta && tag.meta.affix
    },
    initTags: function() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    filterAffixTags: function(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    addTags: function() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag: function() {

    },
    closeSelectedTag: function(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    toLastView: function(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
$tagBg :#304156;
$textColor: #333;

.tag-view-container {
  height: 34px;
  line-height:34px;
  color: #fff;
  background: $tagBg;

  .tags-view-item {
    position: relative;
    display: inline-block;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    padding: 0 8px;
    margin: 4px 0 0 5px;
    border: 1px solid #fff;
    background: #fff;
    color: #333;
  }
}

</style>
