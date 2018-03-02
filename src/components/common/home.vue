<template>
  <div class="home-box">
    <v-header></v-header>
    <div class="container" :class="{open: moible == true}">
      <section class="menu_box">
        <v-nav></v-nav>
      </section>

      <section class="page_box">
        <transition name="list">
          <router-view></router-view>
        </transition>
      </section>

      <section class="box-right">
        <v-search></v-search>
        <v-hot></v-hot>
        <v-cal></v-cal>
        <v-tag></v-tag>
      </section>
    </div>
    <v-footer></v-footer>
  </div>

</template>

<script type="text/ecmascript-6">
  import header from '@/components/header/header'
  import nav from '@/components/nav/nav'
  import footer from '@/components/footer/footer'
  import search from '@/components/search/search'
  import calendar from '@/components/calendar/calendar'
  import tag from '@/components/tag/tag'
  import hotArticle from '@/components/hot_article/hot_article'
  import { mapGetters } from 'vuex'

  export default {
    name: 'home',
    components: {
      'v-header': header,
      'v-footer': footer,
      'v-nav': nav,
      'v-search': search,
      'v-cal': calendar,
      'v-hot': hotArticle,
      'v-tag': tag
    },
    computed: {
      ...mapGetters({
        moible: 'ismoible'
      })
    },
    data () {
      return {}
    },
    methods: {

    },
    created () {
    }
  }
</script>

<style lang="stylus">
  html, body, #app {
    height 100%
    overflow-x hidden !important
    overflow-y auto
  }

  .home-box
    position relative
    height 100%
    padding-bottom 70px
    box-sizing border-box
    .container
      display flex
      max-width 1200px
      min-height calc(100vh - 148px)
      width 100%
      margin 0 auto
      padding-top 80px
      overflow hidden
      .menu_box
        position fixed
        top 80px
        width 168px
        float left
        overflow hidden
        transition: all .35s ease-in-out;
      .page_box
        width 62%
        flex 1
        float left
        box-sizing border-box
        padding 0 10px
        margin-left 168px
        overflow hidden
        transition: all .35s ease-in-out
      .box-right
        float right
        width 24%
        transition: all .35s ease-in-out
    .list-enter-active
      transition: all .5s ease-in-out
    .list-leave-active
      transition: all .2s ease;
      opacity: 0
    .list-enter
      transform: translateY(20px);
      opacity: 0
    .list-move
      transition: all .5s

  @media (max-width: 414px)
    .home-box
      .container
        padding-top 70px
        height calc(100% - 70px)
        .menu_box
          display none
        .page_box
          position relative
          margin-left 0
          width 100%
        .box-right
          display none
      .container.open
        overflow hidden
        transform translateX(60%)
        transition: all .35s ease-in-out
</style>
