<template>
  <div>
    <v-pictitle></v-pictitle>
    <v-list :msg="arr"></v-list>
    a[class=hank]
    <a href="" class="hank"></a>
    ul>(li>ul>li)
    <ul>
      <li>
        <ul>
          <li></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import list from '@/components/list/list'
  import pictitle from '@/components/common/pictitle'
  export default {
    name: 'tag',
    components: {
      'v-pictitle': pictitle,
      'v-list': list
    },
    data () {
      return {
        arr: []
      }
    },
    methods: {
      getdata: function () {
        this.axios.get('/static/list.json', {params: {tag: this.$route.params[0], cur: '1'}})
          .then(res => {
            this.arr = res.data.index
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    beforeMount: function () {
      this.getdata()
    }
  }
</script>

<style>
</style>
