<template>
  <div class="about_container scroll" ref="scroll">
    <ul class="about_box">
      <transition appear appearClass="rotate-enter" appearActiveClass="rotate-leave-active" v-for="item in msg" :key="item.id">
        <li class="about_list">
          <div class="date_box">{{item.creat_time|getLocaltime}}</div>
          <div class="text_box">
            <div class="avt_tit">
              <img src="./avt.jpg">
              <h2>{{item.title}}</h2>
            </div>
            <p class="a_con">{{item.content}}</p>
          </div>
          <div style="clear:both"></div>
        </li>
      </transition>
    </ul>
    <v-more></v-more>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import getMoreData from '@/components/common/getMoredata'
  export default {
    name: 'aboutList',
    props: ['msg'],
    filters: {
      getLocaltime: function (nS) {
        var d = new Date(parseInt(nS) * 1000)
        var date = (d.getFullYear()) + '/' + (d.getMonth() + 1) + '/' + (d.getDate())
        return date

      }
    },
    components: {
      'v-more': getMoreData
    },
    mounted () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.scroll, {
          mouseWheel: true,
          click: true,
          scrollbar: {
            fade: true,
            interactive: false
          },
          probeType: 3
        })
      })
    }
  }
</script>

<style lang="stylus">
  .about_container
    height 100%
    overflow hidden
    .about_box
      padding 20px 0
      .about_list
        cursor pointer
        background url(./line_bg.jpg) repeat-y 40px 0px
        padding 20px 20px 0 0
        .date_box
          float left
          width 80px
          font-size 14px
          color #fff
          background #007fff
          text-align center
          padding 10px 15px
          margin-top 15px
          border-radius 35px 0px 35px 0px
        .text_box
          float right
          width 75%
          padding 20px
          box-shadow 0 0 10px #007fff
          border-radius 15px
          .avt_tit
            overflow hidden
            img
              width 60px
              border-radius 50%
              float left
            h2
              overflow hidden
              display inline-block
              font-size 18px
              font-weight 700
              line-height 60px
              padding-left 30px
              color #333
          .a_con
            font-size 14px
            line-height 22px
    .rotate-enter,.rotate-enter-active
      animation rotateIn 1.5s ease-in-out
    .rotate-leave-active
      animation rotateIn 1.5s reverse
    @keyframes rotateIn
      0%
        transform-origin: center center
        transform: rotate(200deg)
        opacity: 0
      100%
        transform-origin: center center
        transform: rotate(0deg)
        opacity: 1
  @media (max-width: 414px)
    .about_container
      height 100%
      overflow hidden
      .about_box
        padding 10px
        .about_list
          padding 15px 0 0 0
          .date_box
            width 70px
            font-size 12px
          .text_box
            width 60%
            padding 10px

</style>
