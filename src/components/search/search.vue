<template>
  <div class="search_box">
    <div class="search">
      <input type="text" placeholder="搜索...">
      <button  type="button" class="search_btn" v-if="!this.searchmoible"><i class="fa fa-search"></i></button>
      <button  type="button" class="search_btn" v-if="this.searchmoible" @click="closesearch"><i class="fa fa-remove"></i></button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  export default {
    name: 'search',
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters({
        searchmoible: 'searchmoible'
      })
    },
    methods: {
      closesearch: function () {
        this.$emit('showSearch')
      }
    }
  }
</script>

<style lang="stylus">
  .search_box
    width 100%
    background: rgba(255,255,255,0.3)
    padding 5px
    box-sizing border-box
    overflow: hidden
    .search
      display inline-block
      overflow hidden
      vertical-align middle
      input
        float: left
        height: 30px
        border: none
        outline: none
        box-sizing: border-box;
        background-color: hsla(0,0%,77%,.4)
        padding-left: 8px
        &:hover
          background-color: hsla(0,0%,57%,.4)
      button
        float: left
        height: 30px
        border: none
        outline: none
        background-color: hsla(0,0%,57%,.4)
        cursor:pointer
  @media (max-width: 414px)
    .search_box
      position fixed
      top 0
      left 0
      height 60px
      padding 0
      background-color #fff
      z-index 999
      .search
        width 100%
        input
          width 80%
          display inline-block
          position absolute
          top 50%
          transform translate(0,-50%)
          padding-left 20px
          background-color #fff
          &:hover
            background-color #fff
        button
          float right
          width 20%
          height 60px
          box-sizing border-box
          background-color #fff
          font-size 16px
</style>
