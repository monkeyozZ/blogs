<template>
  <div>
    <ul class="tag_box">
      <li class="tag_item" v-for="item in arr">
        <router-link :to="item.tag_name" tag="a">
          <span>{{item.tag_cate}}({{item.count}})</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'tag',
    data () {
      return {
        arr: []
      }
    },
    methods: {
      getalltag: function () {
        this.axios.get('/static/tag.json')
          .then(res => {
            this.arr = res.data.taglist
            for (let i in this.arr) {
              this.arr[i].tag_name = '/tag/' + this.arr[i].tag_name
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    beforeMount: function () {
      this.getalltag()
    }
  }
</script>

<style lang="stylus">
  .tag_box
    max-width 100%
    width 100%
    overflow hidden
    margin-top 10px
    padding 10px
    box-sizing border-box
    background-color rgba(255,255,255,.3)
    .tag_item
      float left
      width 33.3%
      font-size 14px
      margin-top 8px
      text-align center
      span
        display inline-block
        background-color rgba(0,0,0,.1)
        padding 3px 7px
        cursor pointer
        &:hover
          background-color rgba(0,0,0,.2)

</style>
