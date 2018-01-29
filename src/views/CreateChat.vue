<template>
  <div>
    <header-nav :title="pageTitle">
      <div slot="left">
          <span v-show="!isOnInput" class="chat_action_btn" @click="cancelCreateChat">取消</span>
          <span v-show="isOnInput" class="chat_action_btn" @click="cancelInputTopic">取消</span>
      </div>
      <div slot="right">
          <span v-show="!isOnInput" class="chat_action_btn" @click="submitCreateChat">确定</span> 
          <span v-show="isOnInput" class="chat_action_btn fc_grey" @click="submitInputTopic">完成</span>  
      </div>
    
    </header-nav>
    <v-scroll :class="{'white_bg':isOnInput}" :on-refresh="onRefresh" :bottom="0" :top="50" @listscroll="listScroll">
        <div class="topic_input_wrap" :class="{'active': isOnInput}">
          <input type="text" ref="topicInput" @focus="focusTopicInput" v-model="topicVal" :placeholder="topicInputPlaceholder">
        </div>
       
        <div class="contacts_panel" v-show="!isOnInput">

            <div class="contacts_block" v-for="block in contactsList"  ref="contactsBlockItem">
              <div class="contacts_name_indexes"
                  :class="{'active': currentLetter == block.indexes }"
              >{{block.indexes}}</div>
              <ul class="contacts_list">

                <li class="contacts_item" v-for="person in block.list">
                  <span class="contacts_select" :class="{'active':selectedcontactsArr.indexOf(person.id) != -1}" @click="selectContacts(person.id)"></span>
                  <img class="contacts_avatar" :src="person.avatar"/>
                  <span class="contacts_name">{{person.name}}</span>
                </li>

              </ul>
            </div>
        </div>

    </v-scroll>
    <ul class="letter_indexes" v-show="!isOnInput">
      <li v-for="(item,index) in contactsList" class="letter_indexes_item" 
          :class="{'active': currentLetter == item.indexes }" 
          @click="slideToContactsBlock(item.indexes,index)"
      >{{item.indexes}}</li>
    </ul>
    <!-- <bottom-nav :nav-index="0"></bottom-nav>   -->
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
      pageTitle:'发起对话',
      topicInputPlaceholder:'输入主题',
      topicVal:'',
      isOnInput: false,

      contactsList:[
        { 
          indexes:'A',
          list:[
            {
              name:'Alili',
              avatar:'../../static/timg.jpeg',
              id:'0'
            },
            {
              name:'爱丽丝',
              avatar:'../../static/timg.jpeg',
              id:'1'
            }
          ]
        },
        { 
          indexes:'B',
          list:[
            {
              name:'Banana',
              avatar:'../../static/timg.jpeg',
              id:'3'
            },
            {
              name:'包公',
              avatar:'../../static/timg.jpeg',
              id:'4'
            },
            {
              name:'宝宝抱抱',
              avatar:'../../static/timg.jpeg',
              id:'66'
            }
          ]
        },
        { 
          indexes:'C',
          list:[
            {
              name:'曹操',
              avatar:'../../static/timg.jpeg',
              id:'34'
            },
            {
              name:'曹芳',
              avatar:'../../static/timg.jpeg',
              id:'44'
            },
            {
              name:'曹睿',
              avatar:'../../static/timg.jpeg',
              id:'55'
            },
            {
              name:'曹hehe',
              avatar:'../../static/timg.jpeg',
              id:'88'
            },
            {
              name:'曹FFF',
              avatar:'../../static/timg.jpeg',
              id:'109'
            }
          ]
        },
        { indexes:'D',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'222'}] },
        { indexes:'E',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'223'}] },
        { indexes:'F',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'224'}] },
        { indexes:'G',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'225'}] },
        { indexes:'H',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'226'}] },
        { indexes:'I',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'227'}] },
        { indexes:'J',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'228'}] },
        { indexes:'K',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'229'}] },
        { indexes:'L',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'230'}] },
        { indexes:'M',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'231'}] },
        { indexes:'N',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'232'}] },
        { indexes:'O',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'233'}] },
        { indexes:'P',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'234'}] },
        { indexes:'Q',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'235'}] },
        { indexes:'R',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'236'}] },
        { indexes:'S',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'237'}] },
        { indexes:'T',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'238'}] },
        { indexes:'U',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'239'}] },
        { indexes:'V',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'2221'}] },
        { indexes:'W',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'2222'}] },
        { indexes:'X',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'2223'}] },
        { indexes:'Y',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'2224'}] },
        { indexes:'Z',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'2225'}] },
        { indexes:'#',list:[{name:'XXX',avatar:'../../static/timg.jpeg',id:'2226'}] }

      ],

      selectedcontactsArr:[],

      currentLetter:'',

      contactsBlocks:null,

    }
  },
  methods:{

    getcontactsData(){
      this.contactsBlocks = this.$refs.contactsBlockItem;
      this.currentLetter = this.contactsList[0].indexes;
    
    },
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    },
    listScroll(){
      let flag;
      for(let i = 0; i < this.contactsBlocks.length; i++){
          let top = this.contactsBlocks[i].getBoundingClientRect().top
          if(top > 50){
            this.currentLetter = this.contactsList[i].indexes;
            break;
          }
      }
    },

    focusTopicInput(e){
      this.isOnInput = true;
      this.pageTitle = '输入主题';
      this.topicInputPlaceholder = '';  
    },
    cancelCreateChat(){
      this.$router.go(-1);
    },
    submitCreateChat(){
      if(this.selectedcontactsArr.length == 0){
          T.Alert({
            text:'请选择参与会话的人员',
            confirm(){}
          });
          return;
      };
      let selectedcontacts = this.selectedcontactsArr.join(',');
      this.$router.go(-1);
    },
    cancelInputTopic(){
      this.isOnInput = false;
      this.pageTitle = '发起对话';
      this.topicInputPlaceholder = '输入主题';

    },
    submitInputTopic(){
      console.log(this.topicVal);
      this.cancelInputTopic();
    },
    selectContacts(id){
       let idIndex = this.selectedcontactsArr.indexOf(id);
       if( idIndex != -1){
          this.selectedcontactsArr.splice(idIndex,1);
          return;
       }
       this.selectedcontactsArr.push(id);
    },

    slideToContactsBlock(letter,index){
      this.currentLetter = letter;
      this.contactsBlocks[index].scrollIntoView();
      console.log(index);

    }
 
  },
  mounted(){
      this.getcontactsData();
      document.title = '发起对话';
  }
}
</script>
<style scoped>
  .yo-scroll.white_bg{
    background-color: #fff;
  }

  .chat_action_btn{
    font-size: 16px;
  }
  .chat_action_btn.fc_grey{
    color: #585858;
  }

  .topic_input_wrap{
    box-sizing: border-box;
    height: 44px;
    background-color: #fff;
    padding:  7px 15px;
  }
  .topic_input_wrap.active{
    border-bottom: 1px solid #ababab;
  }
  .topic_input_wrap input{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    width: 100%;
    border:none;
  }



  .contacts_name_indexes{
    height: 21px;
    font-size: 12px;
    padding-left: 18px;
    color: #a5a5a5;
    line-height:21px;
  }
  .contacts_name_indexes.active{
    color: #67c0ea;
  }
  .contacts_list{
    padding-left: 15px;
    background-color: #fff;

  }
  .contacts_list .contacts_item{
    height: 55px;
    border-bottom: 1px solid #585858;
    display: flex;
    align-items: center;
    padding-left: 4px;
  }
  .contacts_list .contacts_item:last-child{
    border-bottom: none;
  }
  .contacts_list .contacts_item .contacts_select{
    width: 18px;
    height: 18px;
    border-radius: 10px;
    border:1px solid #868686;
    margin-right: 16px;
  }
  .contacts_list .contacts_item .contacts_select.active{
    width: 20px;
    height: 20px;
    background: url(../assets/img/selected_icon.png) no-repeat 0 0;
    background-size: 20px 20px;
    border:none;
  }
  .contacts_list .contacts_item .contacts_avatar{
    width: 36px;
    height: 36px;
     margin-right: 18px;
  }
  .contacts_list .contacts_item .contacts_name{
    color: #222;
    font-size: 16px;
  }




  .letter_indexes{
    position: fixed;
    top:96px;
    right: 10px;
  }
  .letter_indexes .letter_indexes_item{
    font-size: 12px;
    color: #222;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    margin-bottom: 4px;
    border-radius: 50%;


  }
  .letter_indexes .letter_indexes_item.active{
    color: #fff;
    background-color: #67bfe7;
  }

  
</style>