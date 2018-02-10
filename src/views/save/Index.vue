<template>
  <div>
    <header-nav :title="'存档'"></header-nav>
      <search-bar :on-focus="focusSearchBar" :show-cancel="false"></search-bar>
      <v-scroll :on-refresh="onRefresh" :bottom="50" :top="90">
        
        <ul class="slider_edit_list">

          <li class="slider_edit_item" v-for="(item,index) in saveList">
            <slider-edit-item :key-id="index" :slider-index.sync="sliderIndex" @onlytap="toChatRoom(item.id)">
                <div class="chat_item">
                  <img class="user_avater" :src="item.coverImg">
                  <div class="chat_content">
                    <p class="chat_title text-ellipsis">{{item.topic}}</p>
                    <p class="chat_abstract">
                      <span>层数：{{item.layer}}</span>
                      <span v-show="item.newMsg == 0">总信息数：{{item.totalMsg}}</span>
                      <span v-show="item.newMsg > 0">新增信息数：<b>{{item.newMsg}}</b></span>
                    </p>
                    <span class="chat_time">{{item.time}}</span>
                    <span class="restart_icon" v-if="item.restart == 1"  @click="restartChatStep1(item.id,index,1)" @touchstart.stop=""></span>
                  </div>
                </div>
            </slider-edit-item>

            <div class="edit_btns">
              <div class="edit_btn btn_blue" @click.stop="restartChatStep1(item.id,index)">重启</div>
              <div class="edit_btn btn_red"  @click.stop="deleteChatStep1(item.id,index)">删除</div>
            </div>
          </li>
        </ul>
      </v-scroll>

      <div>
          <div class="action_select_list_mask" v-show="actionSelectShow" @click="actionSelectShow = false"></div>
          <ul class="action_select_list" :class="{show:actionSelectShow}">
            <li class="action_select_item sm_font" v-if="!isResponseRestart">点击重启，等待对方同意</li>
            <li class="action_select_item sm_font" v-if="isResponseRestart">点击重启将继续对话</li>
            <li class="action_select_item red_font" @click="restartChatStep2">重启</li>
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
      
    <bottom-nav :nav-index="2"></bottom-nav>  
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
  name: 'Save',
  components:{
    'header-nav': HeaderNav,
    'v-scroll': Scroll,
    'slider-edit-item':SliderEditItem,
    'search-bar':SearchBar,
    'bottom-nav': BottomNav
    
  },
  data () {
    return {
      actionSelectShow:false,
      deleteConfirmPanelShow:false,
      isResponseRestart:false,

      sliderIndex:-1,
      saveList:[
          {
            topic:'江帆：上海房产过户手续准备资金',
            layer:4,
            newMsg:0,
            totalMsg:6,
            time:'下午16:56',
            coverImg:'http://www.zjresume.com/tumeet/timg.jpeg',
            id:1,
            restart:0
          },
          {
            topic:'王丽：杭州房产过户手续准备资金',
            layer:2,
            newMsg:2,
            totalMsg:8,
            time:'2017/8/6',
            coverImg:'http://www.zjresume.com/tumeet/timg.jpeg',
            id:2222,
            restart:1
          },
          {
            topic:'张三：山沟沟房产过户手续准备资金',
            layer:6,
            newMsg:4,
            totalMsg:8,
            time:'2017/8/5',
            coverImg:'http://www.zjresume.com/tumeet/timg.jpeg',
            id:333,
            restart:0
          },
      ]
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
    toChatRoom(id){
 
      this.$router.push('/chat/'+ id +'/1');
    },
    restartChatStep1(id,index,flag){
      this.isResponseRestart = false;
      if(flag){
        this.isResponseRestart = true;
      };
      this.currentActionChatIndex = index;
      this.actionSelectShow = true;
    },
    restartChatStep2(){
       this.sliderIndex = -1;
      let index = this.currentActionChatIndex;
      this.actionSelectShow = false;
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
          this.saveList.splice(index,1);
          T.hideLoading();
      },300)
    }
   
  },
  mounted(){

  }
}
</script>
<style scoped>
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