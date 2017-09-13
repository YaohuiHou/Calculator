<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
    @import "./assets/css/layout.less";
    @import "./assets/css/title-bar/title-bar.less";
    @import "./assets/css/home/button.less";
    @import "./assets/css/home/prompts.less";
    @import "./assets/css/home/fill.less";
    @import "./assets/css/detail/charges.less";
    @import "./assets/css/detail/insurance.less";
    @import "./assets/css/popups/vehicle.less";
    @import "./assets/css/popups/brands.less";
    @import "./assets/css/popups/header.less";
    @import "./assets/css/popups/equal.less";
    @import "./assets/css/popups/series.less";
    /*detail*/
    @import "./assets/css/detail/charges";
    @import "./assets/css/detail/data";
    @import "./assets/css/detail/insurance";
    @import "./assets/css/detail/tab";
    @import "./assets/css/detail/process";
    @import "./assets/css/popups/vehicle";
    @import "./assets/css/popups/header";
    @import "./assets/css/popups/brands";
    @import "./assets/css/popups/series";
    @import "./assets/css/detail/item";
    @import "./assets/css/detail/check";
    @import "./assets/css/detail/process";
    @import "./assets/css/detail/way";
    @import "./assets/css/footer/footer";
</style>
