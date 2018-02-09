<template>
  <div>
    <header-nav :title="'资料设置'">
      <div class="nav_custom_left" slot="left" @click="toBack">
         <img  src="../../assets/img/left_arrow.png"/>
         <span class="nav_left_text">个人详情</span>
      </div>
    </header-nav>
      <v-scroll :on-refresh="onRefresh" :bottom="50" :top="50">

        <div class="custom_nav_bar" @click="toEditName">
          <div class="left_sec">昵称</div>
          <div class="right_sec has_right_arrow">
            <span>肖总</span>
          </div>
        </div>


        <div class="custom_nav_bar">
          <div class="left_sec">把他推荐给好友</div>
          <div class="right_sec has_right_arrow"></div>
        </div>


        <div class="btn_wrap">
          <div class="btn btn-red btn-large" @click="toDelete">删除</div>
        </div>
       

      </v-scroll>
  </div>
</template>

<script>

import HeaderNav from '../../components/HeaderNav.vue'

import Scroll  from '../../components/Scroll.vue'

import T from '../../tool/tool'

export default {
  name: 'EditFriendDeatil',
  components:{
    'header-nav': HeaderNav,
    'v-scroll': Scroll,
  },
  data () {
    return {
    
      friendId:null,
      topicVal:''
    }
  },
  methods:{
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
    toBack(){
      this.$router.go(-1);
    },
    toDelete(){
      console.log('删除好友');
    },
    toEditName(){
      this.$router.push('/editFriendName/'+ this.friendId)
    }
  },
  mounted(){
   
    this.friendId = this.$route.params.friendId;
    console.log(this.$route.params.friendId);
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

    .custom_nav_bar{
      margin-top: 20px;
      height: 43px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;

    }
    .custom_nav_bar .left_sec{
      font-size: 16px;
      color: #222;
    }
    .custom_nav_bar .right_sec{
      height: 20px;
      line-height: 20px;
      min-width: 1px;
      font-size: 15px;
      color: #888;
      padding-right: 15px;
    }
    .custom_nav_bar .right_sec.has_right_arrow{
       background:url(../../assets/img/right_arrow.png) no-repeat 100% center;
       background-size: auto 14px; 
    }
    .btn_wrap{
      margin-top: 25px;
      padding: 0 18px;
    }

  
  
</style>