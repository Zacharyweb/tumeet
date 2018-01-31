<template>
  <div>
    <header-nav :title="'我'"></header-nav>
    <v-scroll :on-refresh="onRefresh"  :bottom="60" :top="50" >
  
    <ul class="router-bar">
      <li class="router-bar-item" @click="routerTo('/avatar')">
        <div class="item-left">
          <span class="router-bar-name">头像</span>
        </div>
        <div class="item-right">
          <img class="user_avatar" src="../../../static/timg.jpeg" />
          <span class="right-arrow"></span>
        </div>

      </li>
      <li class="router-bar-item" @click="routerTo('/edName')">
        <div class="item-left">
          <span class="router-bar-name">名字</span>
        </div>
        <div class="item-right">
          <span class="right_text">Lilong</span>
          <span class="right-arrow"></span>
        </div>
      </li>
      <li class="router-bar-item">
        <div class="item-left">
          <span class="router-bar-name">tumeet号</span>
        </div>
        <div class="item-right">
          <span class="right_text">Lilong-2025</span>
        </div>
      </li>

      <li class="router-bar-item" @click="routerTo('/qrcode')">
        <div class="item-left">
          <span class="router-bar-name">我的二维码</span>
        </div>
        <div class="item-right">
          <img class="QRcode_icon" src="../../assets/img/code_icon.png" >
          <span class="right-arrow"></span>
        </div>
      </li>

      <li class="router-bar-item">
        <div class="item-left">
          <span class="router-bar-name">手机号码</span>
        </div>
        <div class="item-right">
          <span class="right_text">15757177444</span>
        </div>
      </li>

      <li class="router-bar-item" @click="routerTo('/set')">
        <div class="item-left">
          <span class="router-bar-name">设置</span>
        </div>
        <div class="item-right">
          <span class="right-arrow"></span>
        </div>
      </li>
    </ul>

  
 

    </v-scroll>
    <div class="btn_wrap">
      <div class="btn btn-red btn-large" @click="logout">退出登录</div>
    </div>
    <bottom-nav :nav-index="3"></bottom-nav>
  </div>
</template>

<script>
import HeaderNav from '../../components/HeaderNav.vue'
import BottomNav from '../../components/BottomNav.vue'
import Scroll  from '../../components/Scroll.vue'
import T from '../../tool/tool'
export default {
  name: 'Mine',
  components:{
    'header-nav': HeaderNav,
    'bottom-nav': BottomNav,
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
    logout(){
      this.$router.push('/sign');
    }
  },
  mounted(){
   
  }
}
</script>
<style scoped>
  
  .btn_wrap{
    z-index: 10;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 50px;
  }
  .btn_wrap .btn{
    border-radius:0;
  }



</style>
