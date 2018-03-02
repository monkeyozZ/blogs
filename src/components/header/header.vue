<template>
  <div>
    <transition name="search">
      <v-search v-if="search" v-on:showSearch="showSearch"></v-search>
    </transition>
    <div class="header" :class="{open:moible == true}">
      <section class="nav-box">
        <i class="navbar" :class="{'fa fa-reorder': moible == false,'fa fa-remove':moible == true }" @click="changeopen({ismoible: !moible})"></i>
        <a href="/" class="logo">< alert(monkey)/></a>
        <i class="fa fa-search search" @click="showSearch"></i>
      </section>
      <aside>
        <v-nav></v-nav>
      </aside>
    </div>
  </div>
</template>

<script>
  import nav from '@/components/nav/nav'
  import search from '@/components/search/search'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'v-header',
    components: {
      'v-nav': nav,
      'v-search': search
    },
    data () {
      return {
        search: false
      }
    },
    computed: {
      ...mapGetters({
        moible: 'ismoible'
      })
    },
    methods: {
      ...mapActions({
        changeopen: 'changeshow',
        moiblewidth: 'moiblewidth'
      }),
      showSearch: function () {
        this.search = !this.search
      },
      moiblesearch: function () {
        var width = document.documentElement.clientWidth
        if (width <= 750) {
          this.moiblewidth({searchmoible: true})
        }
      }
    },
    beforeMount: function () {
      this.moiblesearch()
    }
  }
</script>

<style lang="stylus">
  @import "../../assets/stylus/bass.styl"
  .header
    position fixed
    width 100%
    top 0
    left 0
    z-index 998
    background-color hsla(0,0%,100%,.6)
   .nav-box
     max-width 1050px
     width 100%
     height 70px
     margin 0 auto
     overflow hidden
    .logo
      display inline-block
      font-size 28px
      font-family logofont
      line-height 70px
      letter-spacing 5px
      cursor pointer
      color #007fff
    .navbar,.search
      display none
    aside
      display none
  @font-face
    font-family 'logofont'
    src url('./font/Lobster.ttf')
    src url('./font/Lobster.eot?#iefix') format('embedded-opentype') /* IE6-IE8 */
        url('./font/Lobster.woff') format('woff') /* Modern Browsers */
        url('./font/Lobster.ttf') format('truetype') /* Safari, Android, iOS */
  @media (max-width: 414px)
    body
      overflow-x hidden!important
    .header
      background none
      transform translateX(0)
      .nav-box
        height 60px
        text-align center
        background-color hsla(0,0%,100%,.6)
        .logo
          letter-spacing 2px
          line-height 60px
          font-size 18px
          margin 0 auto
        .navbar,.search
          float left
          display block
          line-height 60px
          width 20%
        .search
          display block
          float right
      aside
        display block
        position fixed
        width 60%
        height 100vh
        top 0px
        left -60%
        overflow hidden
        padding-top 20px
        background-color #34393d
        transform perspective(2000px) rotateY(60deg)
        transform-origin 0 100%
        transform-style preserve-3d
        z-index 100
    .header.open
      transform translateX(60%)
      transition: all .35s ease-in-out;
      aside
        top 0
        transform perspective(2000px) rotateY(0deg)
        transition: all .35s ease-in-out
  .search-enter-active
    transition: all .5s ease-in-out
  .search-leave-active
    transition: all .3s ease
    opacity: 0
  .search-enter,.search-leave-to
    transform: translateY(-25px)
    opacity: 0
  .search-move
    transition: all .35s
</style>
