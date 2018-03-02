<template>
  <div class="cate_icon">
    <p class="tit_icon">
      <i :class="pictitle[0]" v-if="pictitle.length !== 0"></i>
    </p>
    <h2>{{pictitle[1]}}</h2>
  </div>
</template>

<script>
  export default {
    name: 'pictitle',
    props: ['pictitle'],
    data () {
      return {

      }
    }
  }
</script>

<style lang="stylus" scoped>
  .cate_icon
    text-align center
    width 100%
    height 103px
    background-color rgba(255,255,255,0.3)
    margin-bottom 10px
    .tit_icon
      margin-top 10px
      width 55px
      display inline-block
      text-align center
      animation-delay 2.5s
      transform-origin 50% 100%
      transform-style preserve-3d
      line-height 35px
      i
        display inline-block
        animation myRotate 5s infinite
        font-size 55px
        &:hover
          color #007fff
    h2
      text-align center
      cursor default
  @keyframes myRotate
    0%
      opacity 1
      -webkit-transform scale(1)
      transform scale(1)
    33%
      opacity .8
      -webkit-transform scale(.9) rotateY(0deg)
      transform scale(.9) rotateY(0deg)
    66%
      opacity .8
      -webkit-transform scale(.9) rotateY(1turn)
      transform scale(.9) rotateY(1turn)
    to
      opacity 1
      -webkit-transform scale(1)
      transform scale(1)
</style>
