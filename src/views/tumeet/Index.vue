<template>
  <div>
    <header-nav :title="'首页'">
      <div slot="center" class="custom_nav_center">
        <span class="new_msg_num" v-show="totalNewMsg > 0">{{totalNewMsg}}</span>
        <img  src="../../assets/img/tumeet_icon.png"/>
      </div>  
       <img slot="right" src="../../assets/img/add_circle.png" @click="createChat"/>
    </header-nav>
    <search-bar :on-focus="focusSearchBar" :show-cancel="false"></search-bar>
    <v-scroll :on-refresh="onRefresh" :bottom="50" :top="90">
      <ul class="slider_edit_list">
        <li class="slider_edit_item" v-for="(item,index) in chatList">
          <slider-edit-item :key-id="index" :slider-index.sync="sliderIndex" @onlytap="toChatRoom(item.id)">
              <div class="chat_item">
                <img class="user_avater" :src="item.coverImg">
                <div class="chat_content">
                  <p class="chat_title text-ellipsis">{{item.topic}}</p>
                  <p class="chat_abstract text-ellipsis">{{item.abstract}}</p>
                  <span class="chat_time">{{item.time}}</span>
                  <span class="new_msg_num" v-show="item.newMsg > 0">{{item.newMsg}}</span>
                </div>
              </div>
          </slider-edit-item>
          <div class="edit_btns">
            <div class="edit_btn btn_red" @click="deleteChatStep1(item.id,index)">删除</div>
            <div class="edit_btn btn_blue" @click="saveChatStep1(item.id,index)">存档</div>
          </div>
        </li>
      </ul>
    </v-scroll>

    <div>
        <div class="action_select_list_mask" v-show="actionSelectShow" @click="actionSelectShow = false"></div>
        <ul class="action_select_list" :class="{show:actionSelectShow}">
          <li class="action_select_item sm_font">存档后，该对话将停止通讯</li>
          <li class="action_select_item red_font" @click="saveChatStep2">存档</li>
          <li class="action_select_item new_block" @click="actionSelectShow = false">取消</li>
        </ul>
    </div>
    <div>
    <div class="action_select_list_mask" v-show="deleteConfirmPanelShow" @click="deleteConfirmPanelShow = false"></div>
        <ul class="action_select_list" :class="{show:deleteConfirmPanelShow}">
          <li class="action_select_item sm_font">删除后，将清空该对话的消息记录</li>
          <li class="action_select_item red_font" @click="deleteChatStep2">删除</li>
          <li class="action_select_item new_block" @click="deleteConfirmPanelShow = false">取消</li>
        </ul>
    </div>


    <bottom-nav :nav-index="0"></bottom-nav>  
  </div>
</template>

<script>

import HeaderNav from '../../components/HeaderNav.vue'
import SearchBar  from '../../components/SearchBar.vue'
import SliderEditItem  from '../../components/SliderEditItem.vue'

import Scroll  from '../../components/Scroll.vue'
import BottomNav from '../../components/BottomNav.vue'
import T from '../../tool/tool'

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
      actionSelectShow:false,
      deleteConfirmPanelShow:false,

      sliderIndex:-1,
      totalNewMsg:0,
      chatList:[
        {
          topic:'江帆：上海房产过户手续准备资金',
          abstract:'跳转界面的设计与更新',
          newMsg:9,
          time:'下午16:56',
          coverImg:'http://www.zjresume.com/tumeet/timg.jpeg',
          id:1,
        },
        {
          topic:'王丽：杭州房产过户手续准备资金',
          abstract:'跳转界面的设计与更新',
          newMsg:2,
          time:'2017/8/6',
          coverImg:'http://www.zjresume.com/tumeet/timg.jpeg',
          id:2222,
        },
        {
          topic:'张三：山沟沟房产过户手续准备资金',
          abstract:'跳转界面的设计与更新',
          newMsg:0,
          time:'2017/8/5',
          coverImg:'http://www.zjresume.com/tumeet/timg.jpeg',
          id:333,
        },
      ],
      currentActionChatIndex:null
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
    toChatRoom(id){
      this.$router.push('/chat/'+ id +'/1');
    },
    initTotalNewMsg(){
      let totalNewMsg = 0;
      this.chatList.forEach(function(item){
          totalNewMsg += item.newMsg*1;
      });
      this.totalNewMsg = totalNewMsg;
    },
    saveChatStep1(id,index){
      this.currentActionChatIndex = index;
      this.actionSelectShow = true;
    },
    saveChatStep2(){
      let index = this.currentActionChatIndex;
      this.actionSelectShow = false;
      this.removeItem(index);
    },
    deleteChatStep1(id,index){
      this.currentActionChatIndex = index;
      this.deleteConfirmPanelShow = true;
    },
    deleteChatStep2(){
      let index = this.currentActionChatIndex;
      this.deleteConfirmPanelShow = false;
      this.removeItem(index);
    },
    removeItem(index){
      this.sliderIndex = -1;
      T.showLoading();
      setTimeout(()=>{
          this.chatList.splice(index,1);
          T.hideLoading();
      },300)
    }
  },
  mounted(){
      this.initTotalNewMsg();

  }
}
</script>
<style scoped>
 
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

</style>