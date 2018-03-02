<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(item,index) in banner" :key="index">
      <router-link tag="a" to="/article/1">
      <img :src="item" alt="">
        <span>6666</span>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data () {
      return {
        banner: ['/static/logo2.png', '/static/logo2.png', '/static/logo2.png', '/static/logo2.png', '/static/logo2.png', '/static/logo2.png'],
        swiperOption: {
          slidesPerView: 3,
          notNextTick: true,
          paginationClickable: true,
          spaceBetween: 15,
          height: '250',
          autoplay: 3000
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="stylus">
  .swiper-slide
    a.router-link-exact-active.router-link-active
    display block
    overflow hidden
    img
      display inline-block
      max-width 100%
      width 100%
      height auto
    span
      display block
      width 100%
      text-align center
      position absolute
      bottom 0
      background rgba(0,0,0,0.1)
      font-size 14px
      padding 5px 0
  @media (max-width: 414px)
    .swiper-slide
      span
        font-size 12px
        padding 3px 0
</style>
