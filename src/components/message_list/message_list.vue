<template>
  <div v-if="listarr.message">
    <div class="sort_box">
      <div class="com_count">
        <p><span>{{length}}</span>条评论</p>
      </div>

      <div class="get_love">
        <vue-star animate="animated bounceIn" color="#F05654">
          <i slot="icon" class="fa fa-heart"></i>
        </vue-star>
        <span>0人喜欢</span>
      </div>

      <div class="com_sort">
        <a href="javascript:;" v-for="(item,index) in sortlist" @click="orderby(index)"
           :class="{'active':index == selected}">{{item}}</a>
      </div>
    </div>
    <div class="msg_box">
      <ul class="msg_list">
        <transition-group name="list">
          <li v-for="(item, index) in listarr.message" :key="item.id">
            <div class="user_avatar">
              <img src="./logo.png">
            </div>
            <div class="msg_content">
              <div class="con_header">
                <p>{{item.name}}<span>{{item.creat_time | getLocalTime}}</span><b>{{item.floor}}楼</b></p>
              </div>

              <div class="con_body">
                <p v-if="item.reply_name">回复@{{item.reply_name}}：</p>
                <p>{{item.content}}</p>
              </div>

              <div class="com_footer">
                <p>
                  <a href="javascript:;" @click="getparentId({pid: item.id})"><i class="fa fa-mail-reply"></i>回复</a>
                  <a href="javascript:;" style="padding-left: 20px" @click="zan(item.floor - 1)"
                     :class="{'active': item.iszan == true}">
                    <vue-star animate="animated rotateIn" color="#F05654">
                      <i slot="icon" class="fa fa-thumbs-o-up"></i>
                    </vue-star>
                    赞({{item.zan}})
                  </a>
                </p>
              </div>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
  import VueStar from 'vue-star'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'meaasge_list',
    data () {
      return {
        sortlist: ['最新', '最热'],
        selected: 0,
        pid: 0,
        length: '',
        user_love: []
      }
    },
    computed: {
      ...mapGetters({
        id: 'id',
        listarr: 'listarr'
      })
    },
    components: {
      VueStar
    },
    methods: {
      compare: function () {
        for (let i = 0; i < this.listarr.message.length - 1; i++) {
          for (let j = 0; j < this.listarr.message.length - i - 1; j++) {
            if (this.listarr.message[j].zan < this.listarr.message[j + 1].zan) {
              let t = this.listarr.message[j]
              this.listarr.message[j] = this.listarr.message[j + 1]
              this.listarr.message[j + 1] = t
            }
          }
        }
      },
      compareTime: function () {
        for (let i = 0; i < this.listarr.message.length - 1; i++) {
          for (let j = 0; j < this.listarr.message.length - i - 1; j++) {
            if (this.listarr.message[j].creat_time > this.listarr.message[j + 1].creat_time) {
              let t = this.listarr.message[j]
              this.listarr.message[j] = this.listarr.message[j + 1]
              this.listarr.message[j + 1] = t
            }
          }
        }
      },
      orderby: function (index) {
        this.selected = index
        if (index === 0) {
          this.compareTime()
        } else if (index === 1) {
          this.compare()
        }
      },
      ...mapActions([
        'getparentId', 'setlistarr'
      ]),
      zan: function (index) {
        let loveStr = localStorage.getItem('user_love') ? localStorage.getItem('user_love') : null
        var num = parseInt(this.listarr.message[index].zan)
        if (loveStr !== null) {
          let userloveObj = JSON.parse(loveStr)
          let res = userloveObj.some(function (item) {
            return (item === index)
          })
          if (!res) {
            userloveObj.push(index)
            let userLoveStr = JSON.stringify(userloveObj)
            localStorage.setItem('user_love', userLoveStr)
            num += 1
            this.listarr.message[index].zan = num
            this.listarr.message[index].iszan = true
            this.axios.post('home/index', {
              num
            })
          } else {
            for (let i = 0; i < userloveObj.length; i++) {
              if (userloveObj[i] === index) {
                userloveObj.splice(i, 1)
                let userLoveStr = JSON.stringify(userloveObj)
                localStorage.setItem('user_love', userLoveStr)
                num -= 1
                this.listarr.message[index].zan = num
                this.listarr.message[index].iszan = false
              }
            }
          }
        } else {
          this.user_love.push(index)
          let userLoveStr = JSON.stringify(this.user_love)
          localStorage.setItem('user_love', userLoveStr)
          num += 1
          this.listarr.message[index].zan = num
          this.listarr.message[index].iszan = true
          this.axios.post('home/index', {
            num
          })
        }
      },
      checkLove: function () {
        var loveStr = localStorage.getItem('user_love') ? localStorage.getItem('user_love') : null
        if (loveStr !== null) {
          var userloveObj = JSON.parse(loveStr)
          for (let i in userloveObj) {
            let j = userloveObj[i]
            this.listarr.message[j].iszan = true
            // this.$refs.VueStar.$data.active = true
          }
        }
      }
    },
    created: function () {
      this.axios.get('/static/message.json', {
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.setlistarr({listarr: res.data})
          this.length = this.listarr.message.length
          this.checkLove()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<style lang="stylus">
  .sort_box
    overflow hidden
    .com_count
      float left
      padding 2px 5px
      background-color: hsla(0, 0%, 77%, .4);
      p
        font-size 14px
        cursor: default
        span
          margin-right 3px
    .get_love
      float left
      overflow hidden
      padding-left 30px
      padding-right 5px;
      margin-left 20px
      line-height 24px
      background-color: hsla(0, 0%, 77%, .4);
      .VueStar
        transform translate(-67%, -37%)
    .com_sort
      float right
      border 1px solid #eee
      a
        display inline-block
        padding 0 5px
        font-size 14px
        line-height 24px
        box-sizing border-box
        border-color #eee
        &:first-child
          border-right 1px solid #eee
      a.active
        background #e6e6e6
        color: #333

  .msg_box
    overflow hidden
    padding 5px
    .list-enter-active
      transition: all .5s ease-in-out
    .list-leave-active
      transition: all .2s ease;
      opacity: 0
    .list-enter
      transform: translateY(20px);
      opacity: 0
    .list-move
      transition: all .5s
    .msg_list
      overflow hidden
      padding 10px 0
      margin-top 10px
      border-bottom 1px dashed #666
      border-top 1px dashed #666
      li
        margin-bottom 10px
        overflow hidden
        padding 10px
        background-color: hsla(0, 0%, 77%, .2);
        &:hover
          background-color: hsla(0, 0%, 57%, .3);
        .user_avatar
          float left
          width 40px
          height 40px
          border 1px solid #999
          border-radius 50%
          overflow hidden
          img
            display inline-block
            max-width 100%
            width 100%
            height auto
        .msg_content
          overflow hidden
          margin 0px
          padding 0 10px;
          .con_header
            overflow hidden
            p
              line-height 40px
              box-sizing border-box
              padding-left 10px
              font-size 16px
              color: #000
              font-weight 400
              span
                display inline-block
                margin-left 50px
                color #555
                font-weight normal
                font-size 12px
              b
                float right
                font-weight normal
                font-size 12px;
          .con_body
            padding 5px 10px
            p
              font-size 14px
              &:last-child
                text-indent 2em
                font-size 14px
          .com_footer
            margin-top 5px
            p
              text-align right
              font-size 14px
              a
                display inline-block
                margin 0 10px
                cursor pointer
                i
                  margin-right 5px
              .VueStar
                transform translate(-58%, -40%)
              a.active
                color red

  @media (max-width: 414px)
    .con_header p span
      margin-left 20px !important
</style>
