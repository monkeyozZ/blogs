<template>
  <div class="list_box scroll" ref="scroll">
    <ul class="item-list">
      <li v-for="item in msg">
        <div class="pic">
          <a href="">
            <img :src="item.thumb_pic" :alt="item.title">
          </a>
        </div>
        <div class="des">
          <router-link :to="item.url" tag="h2"><a href="">{{item.title}}</a></router-link>
          <p>{{item.des | sub}}</p>
        </div>
        <div class="article_footer">
          <p><i class="fa fa-clock-o"><span>{{item.creat_time | getLocalTime}}</span></i></p>
          <p><i class="fa fa-eye"><span>{{item.view}}</span></i></p>
          <p><i class="fa fa-commenting"><span>{{item.talk}}</span></i></p>
          <p><i class="fa fa-heart"><span>{{item.heart}}</span></i></p>
          <p>
            <router-link :to="item.cate_url" tag="a"><i class="fa fa-bars"><span>{{item.category}}</span></i>
            </router-link>
          </p>
        </div>
      </li>
    </ul>
    <v-more></v-more>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import getMoreData from '@/components/common/getMoredata'

  export default {
    name: 'list',
    props: ['msg'],
    components: {
      'v-more': getMoreData
    },
    data () {
      return {}
    },
    mounted () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.scroll, {
          mouseWheel: {
            speed: -100,
            invert: false
          },
          click: true,
          scrollbar: {
            fade: true,
            interactive: false
          },
          probeType: 3,
          pullDownRefresh: {
            threshold: 50,
            stop: 20
          },
          pullUpLoad: {
            threshold: 50
          }
        })
      })
    }
  }
</script>

<style lang="stylus">
  .list_box
    height 50%
    overflow hidden
    .item-list
      margin 0
      padding 0
      li
        position: relative
        padding 10px
        margin-bottom 10px
        background rgba(255, 255, 255, 0.3)
        overflow hidden
        &:hover
          background rgba(85, 85, 85, 0.1)
        &:hover .pic img
          transform: translateX(-5px)
        h2
          margin 0
          transform translateX(0)
          &:hover
            transform translateX(5px)
          a
            font-size 16px;
            font-weight 600
            color: #555
        .pic
          width 170px;
          height 120px;
          float: left;
          overflow: hidden;
          a
            display: inline-block
          img
            display inline-block
            max-width 100%;
            width 100%
            height auto
            transform: scale(1, 1) rotate(0deg)
            transition: 0.5s linear
            &:hover
              transform: scale(1.1, 1.1) rotate(1deg)
        .des
          padding-left 190px
          margin-top 10px
          p
            font-size 14px
            line-height 24px
            cursor default
        .article_footer
          position: absolute;
          bottom: 5px;
          right: 10px;
          display: -webkit-box;
          p
            flex 1
            cursor default
          i
            margin: 0 5px 0 15px
            color: #555
          span
            font-size 12px
            margin-left: 5px

  @media (max-width: 414px)
    .list_box
      height calc(100% - 105px)
      .item-list
        li
          padding 5px
          h2
            font-size 14px
            a
              font-size 14px
          .pic
            position absolute
            top 50%
            transform translate(0, -60%)
            width 150px
            height 120px
            margin-right 10px
          .des
            padding 0 0 25px 160px
            p
              font-size 12px
              line-height 20px
              text-indent 2em
          .article_footer
            width calc(100% - 10px)
            right 50%
            transform translate(50%, 0)
            p
              text-align center
              i
                margin 0
                font-size 12px


</style>
