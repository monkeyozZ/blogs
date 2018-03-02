<template>
  <div class="nav_box">
    <ul>
        <router-link  v-for="item in arr.data" tag="li" exact="true" :to="item.url" :key="item.id" class="nav_item" v-on:click.native="changeopen({ismoible: !moible})">
          <a href="">
            <i :class="item.icon"></i>{{item.name}}
          </a>
        </router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'v-nav',
    data () {
      return {
        arr: []
      }
    },
    computed: {
      ...mapGetters({
        moible: 'ismoible'
      })
    },
    methods: {
      loading: function () {
        var nav = this
        nav.axios.get('/static/nav.json', {responsetype: 'json'})
          .then(function (response) {
            nav.arr = response.data
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      ...mapActions({
        changeopen: 'changeshow'
      })
    },
    beforeMount: function () {
      this.loading()
    }
  }
</script>

<style lang="stylus">
  .nav_box
    box-sizing border-box
    overflow hidden
    .nav_item
      margin-bottom 15px
      font-size 16px
      &:hover
        a
          color #007fff
      a
        display block
        line-height 32px
        padding 5px 10px
        i
          margin 0 14px
    .router-link-active
      background rgba(255,255,255,.3)
      border-radius 5px
      a
        color #0088f5
  @media (max-width: 414px)
    .nav_box
      a
        color #eee
      .router-link-active
        background #eee
        border-radius 0


</style>
