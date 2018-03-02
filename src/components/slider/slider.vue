<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in banner" :key="index">
      <router-link to="/article/1" tag="a">
      <img :src="item" alt="">
      </router-link>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'slider',
    data () {
      return {
        banner: ['/static/alone.jpg', '/static/alone.jpg', '/static/alone.jpg', '/static/alone.jpg', '/static/alone.jpg', '/static/alone.jpg'],
        swiperOption: {
          height: '200',
          notNextTick: true,
          autoplay: 3000,
          effect: 'coverflow',
          slidesPerView: 2,
          centeredSlides: true,
          coverflowEffect: {
            rotate: 30,
            stretch: 10,
            depth: 60,
            modifier: 10,
            slideShadows: true
          },
          grabCursor: true,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true
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
  .swiper-container
    margin-bottom 10px
    .swiper-slide a
      display inline-block
      overflow hidden
      img
        display inline-block
        max-width 100%
        width 100%
        height auto
</style>
