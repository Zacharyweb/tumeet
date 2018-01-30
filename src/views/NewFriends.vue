<template>
  <div>
    <header-nav :title="'新的朋友'">
      <div class="nav_custom_left" slot="left" @click="toBack">
         <img  src="../assets/img/left_arrow.png"/>
         <span class="nav_left_text">通讯录</span>
      </div>
      <div slot="right" @click="toAddFriend" style="font-size:15px">添加朋友</div>
    </header-nav>
    <search-bar :on-focus="focusSearchBar" 
                :show-cancel="false" 
                :place-holder="'tumeet号/手机号'" 
                :hide-voice-input="true" 
                :find-by-tel="true">
    </search-bar>
    <v-scroll :on-refresh="onRefresh" :bottom="0" :top="90">

      <div class="add_friends_trigger" @click="toAddTelFriends">
        <img class="green_mobile_icon" src="../assets/img/green_mobile.png"/>
        <p class="tips_text">添加手机联系人</p>
      </div>
       
      <div class="contacts_panel">
          <div class="contacts_block" v-for="(block,blockIndex) in contactsList"  ref="contactsBlockItem">
            <div class="contacts_name_indexes">{{block.indexes}}</div>

            <ul class="contacts_list slider_edit_list">
              <li class="slider_edit_item" v-for="person in block.list">
                <slider-edit-item :key-id="person.id" :slider-index.sync="sliderIndex" :max-left="-75" @click="toFriendDteail(person.id)">
                  <div class="contacts_item">
                      <img class="contacts_avatar" :src="person.avatar"/>
                      <div class="contacts_msg">
                        <span class="contacts_name">{{person.name}}</span>
                        <span class="contacts_tumeet">tumeet:{{person.tumeet}}</span>
                      </div>
                      <span v-if="blockIndex == 0" class="agreen_btn btn-blue" @click.stop="agreenAdd(person.id)">接受</span>
                      <span v-if="blockIndex > 0" class="out_date_status">已过期</span>
                  </div>
                </slider-edit-item>
                <div class="edit_btns">
                  <div class="edit_btn btn-red" @click="deleteContacts(person.id)">删除</div>
                </div>
              </li>
            </ul>

          </div>
      </div>

    </v-scroll>

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
    'slider-edit-item':SliderEditItem,

    'bottom-nav': BottomNav
  },
  data () {
    return {
      contactsList:[
        { 
          indexes:'最近一周',
          list:[
            {
              name:'Alili',
              avatar:'../../static/timg.jpeg',
              id:'0',
              tumeet:'alang1987'
            },
            {
              name:'爱丽丝',
              avatar:'../../static/timg.jpeg',
              id:'1',
              tumeet:'alang1987'
            }
          ]
        },
        { 
          indexes:'一周前',
          list:[
            {
              name:'Banana',
              avatar:'../../static/timg.jpeg',
              id:'3',
              tumeet:'alang1987'
            },
            {
              name:'包公',
              avatar:'../../static/timg.jpeg',
              id:'4',
              tumeet:'alang1987'
            },
            {
              name:'宝宝抱抱',
              avatar:'../../static/timg.jpeg',
              id:'66',
              tumeet:'alang1987'
            }
          ]
        }
      ],


      sliderIndex:-1,
      contactsBlocks:null,

    }
  },
  methods:{
    toBack(){
      this.$router.go(-1);
    },
    getcontactsData(){
      this.contactsBlocks = this.$refs.contactsBlockItem;
      
    },
    focusSearchBar(e){
      e.preventDefault();
      this.$router.push('searchByAccount')
    },
    toAddTelFriends(){
      this.$router.push('addTelFriends');
    },
    toAddFriend(){
       this.$router.push('addFriend');
    },
    toFriendDteail(id){
      this.$router.push('friendDeatil/' + id);
    },
    agreenAdd(id){
       console.log('接受好友'+id);
    },
    deleteContacts(id){
       console.log('删除好友'+id);
    },
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
 
  },
  mounted(){
      this.getcontactsData();
      document.title = '新的朋友';
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
    
    .add_friends_trigger{
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-top:1px solid #dbdae0;
      border-bottom:1px solid #dbdae0;
    }
    .add_friends_trigger .green_mobile_icon{
      height: 32px;
      width: auto;
    }
    .add_friends_trigger .tips_text{
      color:#8c8c8c;
      font-size: 12px;
      margin-top: 10px;
    }


   
   .slider_edit_list .slider_edit_item{
     height: 55px;
     border-bottom: 1px solid #d9d9d9;
     position: relative;
 
   }
   .slider_edit_list .slider_edit_item:last-child{
     border-bottom: none;
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
     font-size: 16px;
     text-align: center;
     line-height: 55px;
   }
 
   .contacts_list .contacts_item{
     position: static;
   }
   .contacts_list .contacts_item .agreen_btn{
       right: 15px;
   }
   .out_date_status{
      right: 15px;
   } 
</style>