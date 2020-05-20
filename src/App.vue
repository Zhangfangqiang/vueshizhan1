<template>
  <div id="wrap">

    <!--头部组件开始-->
    <TheHeader></TheHeader>
    <!--头部组件结束-->

    <!--路由视图开始-->
    <div id="main-container" class="container main-container">
      <router-view></router-view>
    </div>
    <!--路由视图结束-->

    <!--脚部组件开始-->
    <TheFooter></TheFooter>
    <!--脚部组件结束-->

  </div>
</template>

<script>
  import TheHeader from "@/components/layouts/TheHeader";
  import TheFooter from "./components/layouts/TheFooter";

  export default {
    name: 'App',
    components: {
      TheHeader,
      TheFooter
    }
  }
</script>
<style lang="scss">
  $container-large-desktop: 1200px;
  $btn-primary-bg: #00b5ad;
  $btn-primary-border: #00b5ad;
  $label-primary-bg: #00b5ad;
  $pagination-active-bg: #00b5ad;
  $pagination-active-border: #00b5ad;
  $pagination-color: #00b5ad;
  $input-border-focus: #00b5ad;
  $link-color: #12c4c5;
  $link-hover-color: #22ddde;
  $icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
  $fa-font-path: "~font-awesome/fonts/";


  @import "~bootstrap-sass/assets/stylesheets/_bootstrap";
  @import "~font-awesome/scss/font-awesome";
  @import "./assets/css/extra.scss";
  @import "./assets/css/main.scss";
</style>
