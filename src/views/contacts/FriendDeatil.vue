<template>
  <div>
    <header-nav :title="'个人详情'">
      <div class="nav_custom_left" slot="left" @click="toBack">
         <img  src="../../assets/img/left_arrow.png"/>
         <span class="nav_left_text">通讯录</span>
      </div>
      <img slot="right" src="../../assets/img/detail_dots.png"  @click="toEditRemark"/>
    </header-nav>
      <v-scroll :on-refresh="onRefresh" :bottom="50" :top="50">

        <div class="friend_msg_wrap">
          <img class="friend_avatar" src="../../../static/timg.jpeg"/>
          <div class="friend_msg">
            <p class="friend_nickname">肖总</p>
            <p class="timeet_account">tumeet:alang1987</p>
            <p class="friend_name">名字：肖怡然</p>
          </div>
        </div>

        <div class="friend_tel">
          <span class="tel_num_text">电话号码</span>
          <a class="tel_num" :href="'tel:' + tel ">15757177456</a>
        </div>

        <div class="topic_input_panel">
          <input type="text" placeholder="输入主题" v-model="topicVal" />
        </div>
        <div class="btn_wrap">
          <div class="btn btn-blue btn-large" @click="toChat">发起对话</div>
        </div>

       

      </v-scroll>
  </div>
</template>

<script>

import HeaderNav from '../../components/HeaderNav.vue'

import Scroll  from '../../components/Scroll.vue'

import T from '../../tool/tool'

export default {
  name: 'Home',
  components:{
    'header-nav': HeaderNav,
    'v-scroll': Scroll,
  },
  data () {
    return {
      tel:'15757177456',
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
    toEditRemark(){
      this.$router.push('/editFriendDeatil/' + this.friendId);
    },
    toChat(){
      // console.log(this.topicVal);
      this.$router.push('/chat/888/1');
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
      white-space: nowrap;
    }

    .friend_msg_wrap{
      margin-top: 15px;
      height: 86px;
      background-color: #fff;
      display: flex;
      align-items: center;
      padding:0 15px;
    }
    .friend_msg_wrap .friend_avatar{
      height: 63px;
      width: 63px;
      border-radius: 4px;
      margin-right: 18px;   
    }
    .friend_msg_wrap .friend_msg{
      font-size: 14px;
      padding-top: 5px;
    }
    .friend_msg_wrap .friend_nickname{
      font-size: 15px;
      color: #222;
    }
    .friend_msg_wrap .timeet_account{
      margin-top: 5px;
      color: #a2a2a2;
      
    }
    .friend_msg_wrap .friend_name{
      color: #a2a2a2;
    }
    .friend_tel{
      margin-top: 20px;
      padding-left: 15px;
      height: 43px;
      display: flex;
      align-items: center;
      background-color: #fff;
    }
    .friend_tel .tel_num_text{
       font-size: 15px;
       color: #7c7c7c;
       margin-right: 22px;
    }
    .friend_tel .tel_num{
       font-size: 15px;
       color: #046ea8;
    }

    .topic_input_panel{
      margin-top: 44px;
      height: 45px;
      background-color: #fff;
      padding:0 15px;
    }
    .topic_input_panel input{
      border:none;
      font-size: 14px;
      line-height: 45px;
      width:100%;
    }
    .btn_wrap{
      margin-top: 25px;
      padding: 0 18px;
    }

  
</style>