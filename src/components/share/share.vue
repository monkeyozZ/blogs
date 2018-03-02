<template>
  <div class="share">
    <p class="title">分享到：</p>
    <div class="share_box">
      <a href="javascript:;" @click="Share(weibo)"><i class="iconfont icon-weibo"></i></a>
      <a href="javascript:;" @click="Share(weixin)"><i class="iconfont icon-weixin"></i></a>
      <a href="javascript:;" @click="Share(qq)"><i class="iconfont icon-qq"></i></a>
      <a href="javascript:;" @click="Share(qzone)"><i class="iconfont icon-qzone"></i></a>
      <!--<a href="javascript:;" @click="Share(tencentwb)">tqq</a>-->
      <a href="javascript:;" @click="Share(renren)"><i class="iconfont icon-renren"></i></a>
      <a href="javascript:;" @click="Share(douban)"><i class="iconfont icon-douban"></i></a>
      <a href="javascript:;" @click="Share(facebook)"><i class="iconfont icon-facebook"></i></a>
      <a href="javascript:;" @click="Share(twitter)"><i class="iconfont icon-twitter"></i></a>
      <a href="javascript:;" @click="Share(linkedin)"><i class="iconfont icon-linkedin"></i></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'share',
    props: ['info'],
    data () {
      return {
        qzone: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={pic}&summary={content}",
        weibo: "http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&searchPic=false",
        // tencentwb: "http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&appkey=801cf76d3cfc44ada52ec13114e84a96",
        renren: "http://widget.renren.com/dialog/share?resourceUrl={url}&srcUrl={url}&title={title}&description={content}",
        douban: "http://www.douban.com/share/service?href={url}&name={title}&text={content}&image={pic}",
        facebook: "https://www.facebook.com/sharer/sharer.php?u={url}&t={title}&pic={pic}",
        twitter: "https://twitter.com/intent/tweet?text={title}&url={url}",
        linkedin: "https://www.linkedin.com/shareArticle?title={title}&summary={content}&mini=true&url={url}&ro=true",
        liantu: "http://qr.liantu.com/api.php?text={url}",
        weixin: "http://qr.liantu.com/api.php?text={url}",
        qq: "http://connect.qq.com/widget/shareqq/index.html?url={url}&desc={title}&pics={pic}"

      }
    },
    methods: {
      repl: function (str) {
        str = str.replace("{url}", this.info.url)
        str = str.replace("{title}", this.info.title)
        str = str.replace("{content}", this.info.content)
        str = str.replace("{pic}", this.info.pic)
        return str
      },
      Share: function (address) {
        address = this.repl(address)
        window.open(address)
      }

    },
    mounted: function () {
      // console.log(this.info)
    }
  }
</script>

<style lang="stylus">
  @font-face
    font-family: 'iconfont';  /* project id 509058 */
    src: url('./font/iconfont.eot')
    src: url('./font/iconfont.eot?#iefix') format('embedded-opentype'),
      url('./font/iconfont.woff') format('woff'),
      url('./font/iconfont.ttf') format('truetype'),
      url('./font/iconfont.svg#iconfont') format('svg')
  .iconfont
    font-family:"iconfont" !important
    font-size:16px
    font-style:normal
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
  .icon-linkedin
    &:before
      content: "\e724"
  .icon-weixin
    &:before
      content: "\e608"
  .icon-twitter
    &:before
      content: "\ecb3"
  .icon-qq
    &:before
      content: "\e605"
  .icon-qzone
    &:before
      content: "\e620"
  .icon-weibo
    &:before
      content: "\e7e0"
  .icon-facebook
    &:before
      content: "\e676"
  .icon-douban
    &:before
      content: "\e629"
  .icon-renren
    &:before
      content: "\e847"
  .share
    margin-top 10px
    padding 5px
    overflow hidden
    background rgba(255,255,255,0.5)
    p.title
      float left
      line-height 32px
      font-size 14px
    .share_box
      float left
      a
        display inline-block
        padding 5px 15px
        background-color rgba(0,0,0,0.1)
        &:hover
          i
            color #fff
        i
          font-size 20px
          line-height 20px
          color #777
      a:nth-child(1)
        &:hover
          background-color #e6162d
      a:nth-child(2)
        &:hover
          background-color #7bb32e
      a:nth-child(3)
        &:hover
          background-color #30a5dd
      a:nth-child(4)
        &:hover
          background-color #ffbd1d
      a:nth-child(5)
        &:hover
          background-color #71a7dc
      a:nth-child(6)
        &:hover
          background-color #61cd72
      a:nth-child(7)
        &:hover
          background-color #0d3d84
      a:nth-child(8)
        &:hover
          background-color #000000
      a:nth-child(9)
        &:hover
          background-color #3a5898
  @media (max-width: 414px)
    .share
      p
        font-size 14px
      .share_box
          a:nth-last-child(1)
            display none
          a:nth-last-child(2)
            display none
          a:nth-last-child(3)
            display none
          a:nth-last-child(4)
            display none
          a:nth-last-child(5)
            display none
  @media (max-width: 320px)
    .share
      padding-left 15px
</style>
