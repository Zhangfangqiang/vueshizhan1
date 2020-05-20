<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <!--变成手机端页面后展示菜单的按钮开始-->
        <button type="button" class="navbar-toggle" @click="toggleNav">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <!--变成手机端页面后展示菜单的按钮结束-->

        <!--logo开始-->
        <a href="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title">
        </a>
        <!--logo结束-->
      </div>

      <!--导航开始-->
      <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
        <ul class="nav navbar-nav">
          <li v-for="(item, index) in navList" :class="{ active: index === activeNavIndex }">
            <a href="#" @click="changeNavIndex(index)">{{ item }}</a>
          </li>
        </ul>

        <!-- 入口组件 -->
        <div class="navbar-right">
          <TheEntry/>
        </div>
      </div>
      <!--导航结束-->
    </div>
  </div>
</template>

<script>
  import TheEntry from "./TheEntry";

  export default {
    name: 'TheHeader',
    components:{
      TheEntry
    },
    data() {
      return {
        logo: {
          src: 'https://learnku.com/vuejs/uploads/sites/ByvFbNlQYVwhvTyBgLdqitchoacDNznN.jpg',
          title: 'Learnku Vue.js'
        },
        navList: ['社区', '头条', '问答', '教程'],
        activeNavIndex: 0,
        showCollapsedNav: false
      }
    },
    methods: {
      /**
       * nav导航选中
       */
      changeNavIndex(index) {
        this.activeNavIndex = index
      },

      /**
       * 手机端展示菜单的方法
       */
      toggleNav() {
        this.showCollapsedNav = !this.showCollapsedNav
      }
    }
  }
</script>

<style scoped>
  .title { display: none;}
  .navbar-default .navbar-nav > .active > a { background: rgba(0,0,0,.03);}
</style>
