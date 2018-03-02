<template>
  <transition name="list">
    <div class="page_container">
      <aboutList :msg="arr"></aboutList>
    </div>
  </transition>
</template>

<script>
  import aboutList from '@/components/about_list/about_list'
  export default {
    name: 'about_list',
    components: {
      aboutList: aboutList
    },
    data () {
      return {
        arr: []
      }
    },
    methods: {
      getAboutdata: function () {
        this.axios.get('/static/about.json', {params: {'cate': 'about', 'cur': '1'}})
          .then(res => {
            this.arr = res.data.about
            console.log(this.arr)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    beforeMount: function () {
      this.getAboutdata()
    }
  }
</script>

<style lang="stylus">
  .list-enter-active
    transition: all .5s ease-in-out
  .list-leave-active
    transition: all .2s ease; opacity: 0
  .list-enter
    transform: translateY(20px); opacity: 0
  .list-move
    transition: all .5s
  .page_container
    height 100%
    overflow hidden
</style>
