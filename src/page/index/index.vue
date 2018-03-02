<template>
  <div class="page_container">
    <v-slider></v-slider>
    <v-list :msg="arr"></v-list>
  </div>
</template>
<script type="text/ecmascript-6">
  import list from '@/components/list/list'
  import slider from '@/components/slider/slider'

  export default {
    name: 'index',
    components: {
      'v-list': list,
      'v-slider': slider
    },
    data () {
      return {
        arr: []
      }
    },
    methods: {
      request: function () {
        let _this = this
        _this.axios.get('/static/list.json', {params: {'cate': 'index', 'cur': '1'}})
          .then(function (response) {
            _this.arr = response.data.index

          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    created: function () {
      this.request()
    }
  }
</script>

<style lang="stylus">
  .page_container
    height 100%
    overflow hidden
</style>
