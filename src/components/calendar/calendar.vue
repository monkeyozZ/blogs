<template>
  <div class="date-box">
    <Calendar
      v-on:choseDay="clickDay"
      :isHideOtherday=false
      :agoDayHide='1514736000000'
    ></Calendar>
  </div>
</template>

<script>
  export default {
    name: 'calendar',
    data () {
      return {
      }
    },
    methods: {
      clickDay (data) {
        var time = Date.parse(new Date(data))
        var timestring = time / 1000
        var timeend = timestring + 86400
        this.axios.post('home/index', {
          params: {
            startime: timestring,
            endtime: timeend
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  .date-box
    margin-top 10px
    .wh_content_all
      background-color rgba(255, 255, 255, 0.3)
      .wh_top_changge
        li
          color #333
          font-size 16px
          &:first-child,&:last-child
            cursor pointer
          .wh_jiantou1
            border-top: 2px solid #333
            border-left: 2px solid #333
          .wh_jiantou2
            border-top: 2px solid #333
            border-right: 2px solid #333
      .wh_content
        width 90%
        padding 0
        margin 0 auto
        .wh_content_item
          cursor pointer
          color #333
          width 37px
          height: 37px
          line-height: 37px
          .wh_is_today
            background-color: #007fff
            color: #fff
            border-radius: 100px
            text-align: center
          .wh_is_mark, .wh_is_today
            width: 35px
            height: 35px
            line-height: 35px
            margin: auto
          .wh_is_mark
            width: 34px
            height: 34px
          div
            transition none!important
</style>
