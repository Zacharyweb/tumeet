<template>
  <div>
    <header-nav :title="'添加朋友'">
      <div class="nav_custom_left" slot="left" @click="toBack">
         <img  src="../assets/img/left_arrow.png"/>
         <span class="nav_left_text">通讯录</span>
      </div>
    </header-nav>
      <v-scroll :on-refresh="onRefresh" :bottom="50" :top="50">
        <div class="address_input_wrap">
          <input class="address_input" type="text" @focus="toSearchPage($event)" placeholder="tumeet号/手机号">
        </div>
        <p class="my_address">
          <span class="my_address_account">我的tumeet号：LiLong3375</span>
          <span class="my_address_code"></span>
        </p>

        <ul class="add_friends_ways">

          <li class="add_friends_way_item" @click="toSweepCode">
            <img class="way_icon" src="../assets/img/sweep_code.png"/>
            <div class="way_text">
              <p class="way_name">扫一扫</p>
              <p class="way_explain">扫描二维码名片</p>
            </div>
            <span class="right_arrow_icon"></span>
          </li>

          <li class="add_friends_way_item" @click="toAddFriendsByTel">
            <img class="way_icon" src="../assets/img/lookup_tel.png"/>
            <div class="way_text">
              <p class="way_name">手机联系人</p>
              <p class="way_explain">添加通讯录中的朋友</p>
            </div>
            <span class="right_arrow_icon"></span>
          </li>
        </ul>

      </v-scroll>
  </div>
</template>

<script>

import HeaderNav from '../components/HeaderNav.vue'

import Scroll  from '../components/Scroll.vue'

import T from '../tool/tool'

export default {
  name: 'Home',
  components:{
    'header-nav': HeaderNav,
    'v-scroll': Scroll,
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
    toSearchPage(e){
      e.preventDefault();
      this.$router.push('searchByAccount')
    },
    toSweepCode(){
       console.log('扫描二维码名片');
    },
    toAddFriendsByTel(){
   
       this.$router.push({name:'AddTelFriends'});
    },
    toBack(){
      this.$router.go(-1);
    },

   
  },
  mounted(){
      document.title = '首页';
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

    .address_input_wrap{
      margin-top: 15px;
      border-top: 1px solid #ababab;
      height: 25px;
      padding:10px 30px;
      padding-left: 65px;
      display: flex;
      align-items: center;
      background: url(../assets/img/search_bar_icon1.png) no-repeat 30px center;
      background-size: 16px auto;
      background-color: #fff;
    }
    .address_input_wrap input{
        flex: 1;
        height: 25px;
        font-size: 14px;
        border:none;
    }

    .address_input_wrap input::-webkit-input-placeholder{ 
      color: #222;
    }
    .address_input_wrap input::-moz-input-placeholder{ 
      color: #222;
    }
    .address_input_wrap input::-ms-input-placeholder{
      color: #222;
    }

    .my_address{
      margin-top: 9px;
      margin-bottom: 30px;
      padding-left: 65px;
      display: flex;
      align-items: center;
    }
    .my_address .my_address_account{
      font-size: 14px;
      color: #222;
    }
    .my_address .my_address_code{
       margin-left: 12px;
       width: 16px;
       height: 16px;
       background:url(../assets/img/code_icon.png) no-repeat 0 0;
       background-size: 16px 16px;
    }

    .add_friends_ways{
      background-color: #fff;
      padding-left: 22px;
    }
    .add_friends_ways .add_friends_way_item{
      position: relative;
      display: flex;
      align-items: center;
      height: 59px;
      padding-left: 5px;

    }
    .add_friends_ways .add_friends_way_item .way_icon{
      width: 36px;
      height: 36px;
      margin-right: 12px;
    }
    .add_friends_ways .add_friends_way_item .way_text{
     display: flex;
     flex-direction: column;
     justify-content: center;
    } 
    .add_friends_ways .add_friends_way_item .way_name{
      font-size: 16px;
      color: #222;
    } 
    .add_friends_ways .add_friends_way_item .way_explain{
      font-size: 12px;
      color: #808080;
    } 
    .add_friends_ways .add_friends_way_item + .add_friends_way_item{
      border-top: 1px solid #595959;
    }
    .add_friends_ways .add_friends_way_item .right_arrow_icon{
      position: absolute;
      width: 18px;
      height: 18px;
      top:50%;
      margin-top: -9px;
      right: 15px;
      background:url(../assets/img/right_arrow.png) no-repeat 0 0;
      background-size: auto 18px;
    }

  
</style>