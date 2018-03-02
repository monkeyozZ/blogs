<template>
  <div class="comment_box">
    <v-mlist></v-mlist>
    <form @submit.prevent="submit()">
      <div class="send_msg">
        <div class="user">
          <input v-show="!islogin" type="text" placeholder="昵称（必须）" v-model="form.name">
          <input v-show="!islogin" type="text" placeholder="邮箱（必须，ps:不公开）" v-model="form.email">
          <button v-show="islogin" type="button" class="islogin" @click="clearlogin()">退出</button>
        </div>

        <div class="text_box">
          <div class="avatar_box">
            <img src="./logo.png">
          </div>

          <div class="msg_editor">
            <div class="editor_box" contenteditable="true" id="editor" @click="getfocus()" @keyup="editorkeyup">

            </div>
            <div  :class="{'pannel':true,'active':ishide}">
              <i class="fa fa-smile-o" v-show="smile" @click="smiletogg()"></i>
              <div class="emoji">
                <ul>
                  <li v-for="(pic,index) in imglist" @click="confirmEmoji(index)" class="emoji_item"><img :src='url+pic'></li>
                </ul>
              </div>
              <button type="submit" @click="getMsg()">发布评论</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import messageList from '@/components/message_list/message_list'
  import { mapGetters } from 'vuex'

  export default {
    name: 'message',
    components: {
      'v-mlist': messageList
    },
    data () {
      return {
        url: '/static/img/',
        imglist: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png',
          '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png', '20.png', '21.png', '22.png', '23.png', '24.png',
          '25.png', '26.png', '27.png', '28.png', '29.png', '30.png', '31.png', '32.png', '33.png', '34.png', '35.png', '36.png'],
        smile: true,
        ishide: false,
        lastEditRange: null,
        selection: null,
        form: {
          name: '',
          email: '',
          content: '',
          uid: '', // 文章id
          pid: '0', // 回复哪一层楼时把这一层楼的id作为他的父id
          iszan: false, // 用于点赞时的是否需要active样式 ，默认不需要
          floor: '' // 记录楼层
        },
        islogin: false
      }
    },
    computed: {
      ...mapGetters({
        id: 'id',
        pid: 'pid',
        listarr: 'listarr'
      })
    },
    methods: {
      smiletogg: function () {
        let status = this.smile
        if (status) {
          this.smile = false
          this.ishide = true
        }
        if (this.lastEditRange) {
          // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
          this.selection.removeAllRanges()
          this.selection.addRange(this.lastEditRange)
        }
        var num = document.getElementById('editor').childNodes.length
        // alert(num)
        if (num === 0) {
          document.getElementById('editor').focus()
          // IE or DOM
          this.selection = window.getSelection ? window.getSelection() : document.selection
          // IE or DOM
          this.lastEditRange = this.selection.createRange ? this.selection.createRange() : this.selection.getRangeAt(0)
        }
      },
      getfocus: function () {
        // IE or DOM
        this.selection = window.getSelection ? window.getSelection() : document.selection
        // IE or DOM
        this.lastEditRange = this.selection.createRange ? this.selection.createRange() : this.selection.getRangeAt(0)
      },
      confirmEmoji: function (index) {
        let _url = this.imglist[index]
        var img = '<img src="' + this.url + _url + '">'
        this.confirmimg(img)
      },
      confirmimg: function (str) {
        if (!window.getSelection) {
          document.getElementById('editor').focus()
          this.lastEditRange.pasteHTML(str)
          this.lastEditRange.collapse(false)
          this.lastEditRange.select()
        } else {
          document.getElementById('editor').focus()
          this.lastEditRange.collapse(false)
          var hasR = this.lastEditRange.createContextualFragment(str)
          var hasRlastChild = hasR.lastChild
          while (hasRlastChild && hasRlastChild.nodeName.toLowerCase() === 'br' && hasRlastChild.previousSibling && hasRlastChild.previousSibling.nodeName.toLowerCase() === 'br') {
            var e = hasRlastChild
            hasRlastChild = hasRlastChild.previousSibling
            hasR.removeChild(e)
          }
          this.lastEditRange.insertNode(hasR)
          if (hasRlastChild) {
            this.lastEditRange.setEndAfter(hasRlastChild)
            this.lastEditRange.setStartAfter(hasRlastChild)
          }
          this.selection.removeAllRanges()
          this.selection.addRange(this.lastEditRange)
        }
      },
      editorkeyup: function () {
        // 编辑框按键弹起事件
        // 获取选定对象
        this.selection = window.getSelection ? window.getSelection() : document.selection
        // 设置最后光标对象
        this.lastEditRange = this.selection.getRangeAt(0)
      },
      getMsg: function () {
        this.form.content = document.getElementById('editor').innerHTML
      },
      submit: function () {
        if (this.form.name.length === 0) {
          alert('昵称忘了写啊，大兄弟')
          return
        }
        if (this.form.email.length !== 0) {
          var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
          var res = reg.test(this.form.email)
          if (!res) {
            alert('输入正确格式邮箱')
            return false
          }
        } else {
          alert('邮箱忘了写啊，大兄弟')
          return false
        }
        if (this.form.content.length === 0) {
          alert('搞了半天啥也不说？？？？')
          return false
        }
        this.commit()
      },
      commit: function () {
        this.checklogin()
        this.form.floor = this.listarr.message.length + 1
        var formData = this.form
        this.axios.post('home/index', {
          formData
        }).then((response) => {
          if (response.data === 0) { // 留言成功时记住登录信息
            document.getElementById('editor').innerHTML = ''
            var userInfo = {
              'name': this.form.name,
              'email': this.form.email
            }
            var userInfoStr = JSON.stringify(userInfo)
            localStorage.setItem('user', userInfoStr)
            this.islogin = true
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      checklogin: function () {
        var userStr = localStorage.getItem('user') ? localStorage.getItem('user') : null
        if (userStr !== null) {
          var userObj = JSON.parse(userStr)
          this.form.name = userObj.name
          this.form.email = userObj.email
          this.islogin = true
        } else {
          this.islogin = false
        }
      },
      clearlogin: function () {
        this.form.name = null
        this.form.email = null
        this.islogin = false
        localStorage.clear()
      }
    },
    beforeMount: function () {
      this.checklogin()
      this.form.uid = this.id
      console.log(this.form)
    },
    watch: {
      pid: function () {
        this.form.pid = this.pid
        document.getElementById('editor').focus()
      }
    }
  }
</script>

<style lang="stylus">
  .comment_box
    padding 10px
    margin-top 10px
    background rgba(255,255,255,0.6)
    overflow hidden
    .send_msg
      margin-top 10px
      overflow hidden
      padding 0 10px;
      .user
        position relative
        padding-left 50px
        min-height 28px
        input
          width 33.3333333%
          height 28px
          padding 4px 0 4px 10px
          background-color: hsla(0,0%,67%,.4);
          border none
          box-sizing border-box
        .islogin
          position absolute
          top 50%
          right 10px
          transform translate(0,-50%)
          border none
          outline none
          padding 2px 8px
          cursor pointer
      .text_box
        margin-top 10px
        overflow hidden
        .avatar_box
          float left
          margin-right 10px
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
        .msg_editor
          overflow hidden
          .editor_box
            min-height 65px
            padding 5px
            background-color: hsla(0,0%,67%,.4);
            img
              width 20px
          .pannel
            position relative
            min-height 28px
            background-color: hsla(0,0%,67%,.6);
            i
              line-height 28px;
              font-size 24px;
              margin-left 10px
            .emoji
              position absolute
              display none
              top 0
              left 0
              margin-right 86px;
              padding-left 2px
              ul
                overflow hidden
              li
                float left
                width 20px
                margin 2px
                img
                  display inline-block
                  max-width 100%
                  width 100%
                  height auto
            button
              height 28px;
              border none
              padding 0 15px
              float right
              cursor pointer
              background-color: rgba(95,95,95,.2);
              &:hover
                background-color: rgba(95,95,95,.4);
          .pannel.active
            height 84px;
            transition all .5s easin-out
            .emoji
              display block
  @media (max-width: 414px)
    .comment_box .send_msg .user input
      width 80%
      display block
      &:first-child
        margin-bottom 5px

</style>
