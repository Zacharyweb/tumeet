<template>
  <div>
    <header-nav :title="'设置'">
        <div class="nav_custom_left" slot="left" @click="toBack">
          <img  src="../../assets/img/left_arrow.png"/>
        <span class="nav_left_text">我</span>
      </div>
    </header-nav>
    <v-scroll :on-refresh="onRefresh" :bottom="0" :top="50" >
    <ul class="router-bar custom-router-bar">
      <li class="router-bar-item">
        <div class="item-left">
          <span class="router-bar-name">账号与安全</span>
        </div>
        <div class="item-right">
          <span class="right-arrow"></span>
        </div>
      </li>
    </ul>
  
    <ul class="router-bar">
      <li class="router-bar-item">
        <div class="item-left">
          <span class="router-bar-name">新消息通知</span>
        </div>
        <div class="item-right">
          <span class="right-arrow"></span>
        </div>
      </li>
      <li class="router-bar-item">
        <div class="item-left">
          <span class="router-bar-name">多语言</span>
        </div>
        <div class="item-right">
          <span class="right-arrow"></span>
        </div>
      </li>

      <li class="router-bar-item">
        <div class="item-left">
          <span class="router-bar-name">存储空间</span>
        </div>
        <div class="item-right">
          <span class="right-arrow"></span>
        </div>
      </li>

      <li class="router-bar-item">
        <div class="item-left">
          <span class="router-bar-name">去评分</span>
        </div>
        <div class="item-right">
          <span class="right-arrow"></span>
        </div>
      </li>

      <li class="router-bar-item">
        <div class="item-left">
          <span class="router-bar-name">功能介绍</span>
        </div>
        <div class="item-right">
          <span class="right-arrow"></span>
        </div>
      </li>

      <li class="router-bar-item">
        <div class="item-left">
          <span class="router-bar-name">意见建议</span>
        </div>
        <div class="item-right">
          <span class="right-arrow"></span>
        </div>
      </li>
    </ul>
    </v-scroll>
  </div>
</template>

<script>
import HeaderNav from '../../components/HeaderNav.vue'
import Scroll  from '../../components/Scroll.vue'
import T from '../../tool/tool'
export default {
  name: 'SetUp',
  components:{
    'header-nav': HeaderNav,
    'v-scroll': Scroll
  },
   data () {
    return {
     
    }
  },
  methods:{
     onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
    routerTo(path){
      this.$router.push(path);
    },
    toBack(){
      this.$router.go(-1);
    }
  },
  mounted(){
   
  }
}
</script>
<style scoped>
    .nav_custom_left{
      display: flex;
      align-items: center;
    }
    .nav_custom_left img{
      height: 16px!important;
    }
    .nav_left_text{
      margin-left: 6px;
      font-size: 15px;
    }
    .custom-router-bar{
      margin-top: 15px;
      margin-bottom: 20px;
    }
    .router-bar{
      border-top: 1px solid #e6e6e6;
    }
    .router-bar .router-bar-item+.router-bar-item{
       
      border-top: 1px solid #e8e8e8;
    }





</style>
