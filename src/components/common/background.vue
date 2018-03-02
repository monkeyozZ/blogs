<template>
  <vue-particles
    color="#e5e5e5"
    :particleOpacity="0.7"
    :particlesNumber="80"
    shapeType="circle"
    :particleSize="15"
    linesColor="#dedede"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.5"
    :linesDistance="150"
    :moveSpeed="3"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="false"
    clickMode="push"
  >
  </vue-particles>
</template>

<script>
  import Vue from 'vue'
  import VueParticles from 'vue-particles'
  Vue.use(VueParticles)

  export default{
    name: 'background'
  }

</script>

<style lang="stylus">
  body
    position relative
    margin 0
    padding-top 83px
    color #555
  #particles-js
    position: fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(85,85,85,0.08)
    z-index -9999
</style>
