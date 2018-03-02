import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index/index'
import front from '@/page/front/front'
import php from '@/page/php/php'
import chat from '@/page/chat/chat'
import about from '@/page/about/about'
import articleDetails from '@/components/articleDetails/articleDetails'
import tagview from '@/page/tagview/tagview'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {path: '/', component: index},
    {path: '/index', component: index},
    {path: '/category', component: index},
    {path: '/article/:id', component: articleDetails},
    {path: '/category/front', component: front},
    {path: '/category/php', component: php},
    {path: '/category/chat', component: chat},
    {path: '/category/about', component: about},
    {path: '/tag/*', component: tagview}
  ]
})
