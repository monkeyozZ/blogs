<template>
  <div class="footer" :class="{open: moible == true}">
    <section>
      <p>Powered & Designed by monkey<br>Copyright© 2017</p>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default{
    name: 'v-footer',
    computed: {
      ...mapGetters({
        moible: 'ismoible'
      })
    }
  }
</script>

<style lang="stylus">
  .footer
    position: absolute
    bottom: 0
    width 100%
    margin-top 10px
    background rgba(255,255,255,0.6);
    section
      max-width 1050px
      width 100%
      margin 0 auto
      p
        padding 10px 0
        text-align center
        font-size 14px;
        color inherit
  @media (max-width: 414px)
    .footer.open
      transform translateX(60%)
      transition: all .35s ease-in-out
</style>
