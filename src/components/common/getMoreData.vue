<template>
  <div class="get_box">
    <button type="button">哼，我要加载更多...</button>
  </div>
</template>

<script>
  export default {
    name: 'getMoreData',
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus">
  .get_box
    max-width 100%
    width 100%
    overflow hidden
    button
      max-width 100%
      width 100%
      border none
      outline none
      text-align center
      padding 5px
      background rgba(255,255,255,0.5)
      cursor pointer
      font-size 14px
      &:hover
        background rgba(85,85,85,0.1)

</style>
