<template>
  <div>
    <header-nav :title="'通讯录朋友'">
      <div class="nav_custom_left" slot="left" @click="toBack">
         <span class="nav_left_text">关闭</span>
      </div>
    </header-nav>
    <search-bar :on-focus="focusSearchBar" :show-cancel="false"  :hide-voice-input="true"></search-bar>
    <v-scroll :on-refresh="onRefresh" :bottom="0" :top="90">

      <div class="contacts_panel">
          <div class="contacts_block" v-for="(block,blockIndex) in contactsList"  ref="contactsBlockItem">
            <div class="contacts_name_indexes">{{block.indexes}}</div>
            <ul class="contacts_list">
              <li class="contacts_item" v-for="person in block.list" @click="toFriendDteail(person.id)">
                  <img class="contacts_avatar" :src="person.avatar"/>
                  <div class="contacts_msg">
                    <span class="contacts_name">{{person.name}}</span>
                    <span class="contacts_tumeet">tumeet:{{person.tumeet}}</span>
                  </div>
                  <span v-if="person.added != 1" class="agreen_btn btn-blue" @click.stop="agreenAdd(person.id)">添加</span>
                  <span v-if="person.added == 1" class="out_date_status">已添加</span>
              </li>
            </ul>
          </div>
      </div>

    </v-scroll>

    <ul class="letter_indexes">
      <li v-for="(item,index) in contactsList" class="letter_indexes_item" 
          @click="slideToContactsBlock(item.indexes,index)"
      >{{item.indexes}}</li>
    </ul>

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
  name: 'AddTelFriends',
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
          indexes:'#',
          list:[
            {
              name:'Alili',
              avatar:'../../../static/timg.jpeg',
              id:'0',
              tumeet:'alang1987',
              added:0
            },
            {
              name:'爱丽丝',
              avatar:'../../../static/timg.jpeg',
              id:'1',
              tumeet:'alang1987',
              added:1
            }
          ]
        },
        { 
          indexes:'A',
          list:[
            {
              name:'Banana',
              avatar:'../../../static/timg.jpeg',
              id:'3',
              tumeet:'alang1987'
            },
            {
              name:'包公',
              avatar:'../../../static/timg.jpeg',
              id:'4',
              tumeet:'alang1987'
            },
            {
              name:'宝宝抱抱',
              avatar:'../../../static/timg.jpeg',
              id:'66',
              tumeet:'alang1987'
            }
          ]
        },
        { indexes:'C',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'22212'}] },
        { indexes:'D',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'222'}] },
        { indexes:'E',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'223'}] },
        { indexes:'F',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'224'}] },
        { indexes:'G',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'225'}] },
        { indexes:'H',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'226'}] },
        { indexes:'I',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'227'}] },
        { indexes:'J',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'228'}] },
        { indexes:'K',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'229'}] },
        { indexes:'L',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'230'}] },
        { indexes:'M',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'231'}] },
        { indexes:'N',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'232'}] },
        { indexes:'O',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'233'}] },
        { indexes:'P',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'234'}] },
        { indexes:'Q',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'235'}] },
        { indexes:'R',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'236'}] },
        { indexes:'S',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'237'}] },
        { indexes:'T',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'238'}] },
        { indexes:'U',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'239'}] },
        { indexes:'V',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'2221'}] },
        { indexes:'W',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'2222'}] },
        { indexes:'X',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'2223'}] },
        { indexes:'Y',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'2224'}] },
        { indexes:'Z',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'2225'}] }
      ],
      currentLetter:'',
      contactsBlocks:null,

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
    getcontactsData(){
      this.contactsBlocks = this.$refs.contactsBlockItem;
      this.currentLetter = this.contactsList[0].indexes;
      
    },
    focusSearchBar(e){
      e.preventDefault();
      this.$router.push('searchInTelBook');
    },

    toAddTelFriends(){
      this.$router.push('addTelFriends');
    },
    toFriendDteail(id){
      // this.$router.push('friendDeatil/' + id);
    },
    agreenAdd(id){
       console.log('添加好友'+id);
    },
    listScroll(){
      let flag;
      for(let i = 0; i < this.contactsBlocks.length; i++){
          let top = this.contactsBlocks[i].getBoundingClientRect().top
          if(top > 80){
            this.currentLetter = this.contactsList[i].indexes;
            break;
          }
      }
  },
  slideToContactsBlock(letter,index){
      this.currentLetter = letter;
      this.contactsBlocks[index].scrollIntoView();
  }


 
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
</style>