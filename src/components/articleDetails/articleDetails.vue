<template>
  <transition name="list">
  <div class="article_container scroll" ref="scroll">
    <div>
      <div class="article">
        <h1>{{arr.title}}</h1>
        <img src="/static/alone.jpg" alt="">
        <p>{{arr.content}}</p>
      </div>

      <share :info="info"></share>

      <div class="attr_box">
        <p>本文发布于：{{arr.creat_time|getLocalTime}}</p>
        <p>文章分类：{{arr.category}}</p>
        <p>文章标签：{{arr.tag}}</p>
        <p>版权声明：原创文章，如需转载，请注明原出处，避免错误及误导，以便溯源</p>
        <p>本文地址：<a :href="url">{{url}}</a></p>
      </div>

      <div class="card_silder">
        <slider></slider>
      </div>
      <div>
        <message></message>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
  // import Share from '@/assets/js/share'
  import BScroll from 'better-scroll'
  import slider from '@/components/slider/cardStyle'
  import message from '@/components/message/message'
  import share from '@/components/share/share'
  import { mapActions } from 'vuex'
  export default {
    name: 'articledetails',
    data () {
      return {
        arr: [],
        url: '',
        info: []
      }
    },
    components: {
      slider,
      message,
      share
    },
    methods: {
      getUrlParams: function () {
        return this.$route.params.id
      },
      ...mapActions({
        setId: 'setarticleId'
      }),
      getcururl: function () {
        this.url = window.location.href
      },
      setinfo: function () {
        let _this = this
        let infoarr = []
        infoarr.url = encodeURIComponent(_this.url)
        infoarr.title = encodeURIComponent(_this.arr.title)
        infoarr.content = encodeURIComponent(_this.arr.des)
        infoarr.pic = encodeURIComponent(_this.arr.images)
        this.info = infoarr
      }
    },
    beforeMount: function () {
      var id = this.getUrlParams()
      this.setId({id: id})
      this.axios.get('/static/article.json', {
        id: id
      })
        .then(res => {
          this.arr = res.data.article
          this.setinfo() // 初始化分享信息
          // console.log(this.info)
          // console.log(this.arr)
        })
        .catch(err => {
          console.log(err)
        })
      this.getcururl()
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
  // https://github.com/yujiangshui/simple-share.js
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
  .article_container
    width 100%
    height 100%
    overflow hidden
    .article
      padding 20px 10px
      background rgba(255,255,255,0.5)
      h1,h2,h3,h4,h5,h6
        text-align center
        color inherit
        font-weight 700
        font-size 18px
        margin 10px 0 20px 0
      img
        display inline-block
        max-width 100%
        width 100%
        height auto
      p
        font-size 14px;
        line-height 26px;
        color inherit
        text-indent 2em
    .attr_box
      margin-top 10px
      padding 15px 10px
      background rgba(255,255,255,0.5)
      p
        font-size 14px;
        line-height 28px;
        a
          text-decoration underline
    .card_silder
      margin-top 10px;
      overflow hidden
      background rgba(255,255,255,0.5)
</style>
