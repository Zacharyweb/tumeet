<template>
  <div>
    <header-nav :title="'首页'">
      <div slot="center" class="custom_nav_center">
        <span class="new_msg_num">5</span>
        <img  src="../assets/img/tumeet_icon.png"/>
      </div>  
       <img slot="right" src="../assets/img/add_circle.png" @click="createChat"/>
    </header-nav>
      <search-bar :on-focus="focusSearchBar" :show-cancel="false"></search-bar>
      <v-scroll :on-refresh="onRefresh" :bottom="50" :top="90">
        
        <ul class="slider_edit_list">

          <li class="slider_edit_item" v-for="(item,index) in chatArr">
            <slider-edit-item :key-id="index" :slider-index.sync="sliderIndex" @onlytap="toChatRoom">
                <div class="chat_item">
                  <img class="user_avater" src="../../static/timg.jpeg">
                  <div class="chat_content">
                    <p class="chat_title text-ellipsis">江帆：上海房产过户手续准备资金</p>
                    <p class="chat_abstract text-ellipsis">跳转界面的设计与更新</p>
                    <span class="chat_time">2017/8/6</span>
                    <span class="new_msg_num">5</span>
                  </div>
                </div>
            </slider-edit-item>

            <div class="edit_btns">
              <div class="edit_btn btn_red">删除</div>
              <div class="edit_btn btn_blue">存档</div>
            </div>

          </li>
        </ul>
        
      </v-scroll>
    <bottom-nav :nav-index="0"></bottom-nav>  
  </div>
</template>

<script>

import HeaderNav from '../components/HeaderNav.vue'
import SearchBar  from '../components/SearchBar.vue'
import SliderEditItem  from '../components/SliderEditItem.vue'

import Scroll  from '../components/Scroll.vue'
import BottomNav from '../components/BottomNav.vue'
import T from '../tool/tool'

export default {
  name: 'Home',
  components:{
    'header-nav': HeaderNav,
    'v-scroll': Scroll,
    'search-bar':SearchBar,

    'bottom-nav': BottomNav,
    'slider-edit-item':SliderEditItem
  },
  data () {
    return {
      sliderIndex:-1,
      chatArr:[1,1,1,1,1]
    }
  },
  methods:{
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
    focusSearchBar(e){
      e.preventDefault();
      this.$router.push('search')
    },
    createChat(){
      this.$router.push({name:'CreateChat'});
    },
    toChatRoom(index){
      console.log('去聊天室'+index);
    }
   
  },
  mounted(){
      document.title = '首页';
  }
}
</script>
<style scoped>
    .new_msg_num{
      width: 22px;
      height: 17px;
      background: url(../assets/img/msg_num_bg.png) no-repeat 0 0;
      background-size: 22px auto;
      color: #fff;
      font-size: 12px;
      text-align: center;
      line-height: 1.2;
    }
    .custom_nav_center{
      display: flex;
      align-items: center;

    }
    .custom_nav_center .new_msg_num{
      position: absolute;
      top:2px;
      left: -27px;
    }
    .slider_edit_list{
      width: 100%;
      overflow: hidden;
    }
    .slider_edit_list .slider_edit_item{
      height: 67px;
      border-bottom: 1px solid #595856;
      position: relative;
    }    
    .slider_edit_list .slider_edit_item .edit_btns{
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      background-color: #fff;
      display: flex;
    }
    .slider_edit_list .slider_edit_item .edit_btns .edit_btn{
      box-sizing:border-box;
      width: 75px;
      color: #fff;
      font-size: 20px;
      text-align: center;
      line-height: 75px;
    }
    .btn_red{
        background-color: #d70012;
    }
    .btn_blue{
        background-color: #67bfe7;
    }



    .chat_item{
      display: flex;
      align-items: center;
      flex:1;
    }
    .chat_item .user_avater{
      width: 50px;
      height: 50px;
      border-radius: 4px;
    }
    .chat_item .chat_content{
      padding-left: 7.5px;
      flex: 1;
      position: relative;
    }
    .chat_item .chat_title{
      width: 225px;
      font-size: 16px;
      color: #222;
      margin-bottom: 6px;
    }
    .chat_item .chat_abstract{
      width: 225px;
      font-size: 14px;
      color: #999;
    }
    .chat_item .chat_time{
      position: absolute;
      right: 2px;
      top:2px;
      color: #a3a3a3;
      font-size: 14px;
    }

    .chat_item .new_msg_num{
      position: absolute;
      right: 2px;
      top:30px;

    }



  
</style>