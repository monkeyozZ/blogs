<template>
  <div class="page_container">
    <v-pictitle :pictitle="pictitle"></v-pictitle>
    <v-list :msg="arr"></v-list>
  </div>
</template>

<script>
  import list from '@/components/list/list'
  import pictitle from '@/components/common/pictitle'

  export default {
    name: 'front',
    components: {
      'v-list': list,
      'v-pictitle': pictitle
    },
    data () {
      return {
        arr: [],
        pictitle: ['fa fa-pencil', '前端']
      }
    },
    methods: {
      request: function () {
        let _this = this
        _this.axios.get('/static/list.json', {params: {'cate': 'front', 'cur': '1'}})
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
