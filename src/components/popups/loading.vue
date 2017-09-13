<template>
  <div class="loading-wrap" @touchmove.prevent.stop>
    <div class="mark"></div>
    <div class="loading">
      <img src="https://s.kcimg.cn/wap/images/detail/o2oImg/loading.gif" alt="">
      <span>数据加载...</span>
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
    }
  }
}
</script>
<style>
.loading-wrap{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100
}
.mark{
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
}
.loading-wrap .loading{
    position: fixed;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 100px;
    border-radius: 6px;
    margin: -50px 0 0 -50px;
    background: rgba(0, 0, 0, 0.8);
}
.loading-wrap span{
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
}
.loading-wrap img{
  position: absolute;
  left: 50%;
  top: 30px;
  z-index: 18;
  bottom: auto;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: transparent;
  width: 30px;
  height: 30px;
}
</style>
