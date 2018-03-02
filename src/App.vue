<template>
  <div id="app">
    <background></background>
    <home></home>
  </div>
</template>

<script>
  import background from '@/components/common/background'
  import home from '@/components/common/home'
  export default {
    name: 'app',
    components: {
      background,
      home
    }
}
</script>

<style>
</style>
