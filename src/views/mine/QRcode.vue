<template>
  <div>
    <header-nav :title="'我的二维码'">
      <div class="nav_custom_left" slot="left" @click="toBack">
         <img  src="../../assets/img/left_arrow.png"/>
         <span class="nav_left_text">个人详情</span>
      </div>
      <img slot="right" src="../../assets/img/detail_dots.png"  @click="toEdit"/>
    </header-nav>
    <v-scroll :on-refresh="onRefresh" :bottom="0" :top="50">
      <div class="qrcode_panel">

        <div class="qrcode_panel_top">
          <img class="user_avatar" src="../../../static/timg.jpeg"/>
          <div class="user_msg">
            <p class="user_name">张力charlie</p>
            <p class="user_from">浙江 温州</p>
          </div>
        </div>

        <div class="qrcode_panel_center">
          <img class="user_qrcode" src="../../assets/img/qrcode.png"/>
        </div>

        <p class="qrcode_panel_bottom">扫一扫上面的二维码图案，加我tumeet</p>   
      </div>
        
    </v-scroll>
  </div>
</template>
<script>
import HeaderNav from '../../components/HeaderNav.vue'
import Scroll  from '../../components/Scroll.vue'
import T from '../../tool/tool'
export default {
  name: 'QRcode',
  components:{
    'header-nav': HeaderNav,
    'v-scroll': Scroll,
  },
  data () {
    return {
       actionSelectShow:false,
    }
  },
  methods:{
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
    toEdit(){

    },
    toBack(){
      this.$router.go(-1);
    },
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
      white-space: nowrap;
    }
    .yo-scroll{
      background-color: rgba(0,0,0,0.8);
    }
    .qrcode_panel{
      box-sizing: border-box;
      padding:20px;
      width: 330px;
      height: 440px;
      background-color: #fff;
      margin:0 auto;
      margin-top: 50px;
      border-radius: 3px;
    }
    .qrcode_panel .qrcode_panel_top{
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .qrcode_panel .qrcode_panel_top .user_avatar{
      width: 63px;
      height: 63px;
      border-radius: 3px;
      margin-right: 15px;
    }
    .qrcode_panel .qrcode_panel_top .user_msg{
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .qrcode_panel .qrcode_panel_top .user_name{
      font-size: 18px;
      color: #222;
    }
    .qrcode_panel .qrcode_panel_top .user_from{
      margin-top: 5px;
      font-size: 14px;
      color: #888;
    }
    .qrcode_panel .qrcode_panel_center{
      padding:0 10px;
    }
    .qrcode_panel .qrcode_panel_center .user_qrcode{
      width: 100%;
    }
    .qrcode_panel .qrcode_panel_bottom{
      margin-top: 10px;
      text-align: center;
      font-size: 14px;
      color: #808080;
    }
</style>