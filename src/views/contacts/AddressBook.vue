<template>
  <div>
    <header-nav :title="'通讯录'">
      <img slot="right" src="../../assets/img/add_friend_icon1.png" @click="toAddFriend"/>
    </header-nav>
    <search-bar :on-focus="focusSearchBar" :show-cancel="false"></search-bar>
    <v-scroll :on-refresh="onRefresh" :bottom="50" :top="90" @listscroll="listScroll">
        <div class="add_friends_bar" @click="toViewNewFriend">
           <img class="add_friends_img" src="../../assets/img/add_friend_icon.png"/>
           <span class="new_friends_text">新的朋友</span>
        </div>
       
        <div class="contacts_panel">
            <div class="contacts_block" v-for="block in contactsList"  ref="contactsBlockItem">
              <div class="contacts_name_indexes"
                  :class="{'active': currentLetter == block.indexes }"
              >{{block.indexes}}</div>
              <ul class="contacts_list">
                <li class="contacts_item" v-for="person in block.list" @click="toFriendDteail(person.id)">
                  <img class="contacts_avatar" :src="person.avatar"/>
                  <span class="contacts_name">{{person.name}}</span>
                </li>
              </ul>
            </div>
        </div>

    </v-scroll>
    <ul class="letter_indexes">
      <li v-for="(item,index) in contactsList" class="letter_indexes_item" 
          :class="{'active': currentLetter == item.indexes }" 
          @click="slideToContactsBlock(item.indexes,index)"
      >{{item.indexes}}</li>
    </ul>
    <bottom-nav :nav-index="1"></bottom-nav>  
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
  name: 'AddressBook',
  components:{

    'header-nav': HeaderNav,
    'v-scroll': Scroll,

    'search-bar':SearchBar,
    'bottom-nav': BottomNav,
  },
  data () {
    return {
      contactsList:[
        { 
          indexes:'A',
          list:[
            {
              name:'Alili',
              avatar:'../../../static/timg.jpeg',
              id:'0'
            },
            {
              name:'爱丽丝',
              avatar:'../../../static/timg.jpeg',
              id:'1'
            }
          ]
        },
        { 
          indexes:'B',
          list:[
            {
              name:'Banana',
              avatar:'../../../static/timg.jpeg',
              id:'3'
            },
            {
              name:'包公',
              avatar:'../../../static/timg.jpeg',
              id:'4'
            },
            {
              name:'宝宝抱抱',
              avatar:'../../../static/timg.jpeg',
              id:'66'
            }
          ]
        },
        { 
          indexes:'C',
          list:[
            {
              name:'曹操',
              avatar:'../../../static/timg.jpeg',
              id:'34'
            },
            {
              name:'曹芳',
              avatar:'../../../static/timg.jpeg',
              id:'44'
            },
            {
              name:'曹睿',
              avatar:'../../../static/timg.jpeg',
              id:'55'
            },
            {
              name:'曹hehe',
              avatar:'../../../static/timg.jpeg',
              id:'88'
            },
            {
              name:'曹FFF',
              avatar:'../../../static/timg.jpeg',
              id:'109'
            }
          ]
        },
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
        { indexes:'Z',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'2225'}] },
        { indexes:'#',list:[{name:'XXX',avatar:'../../../static/timg.jpeg',id:'2226'}] }

      ],


      currentLetter:'',
      contactsBlocks:null,

    }
  },
  methods:{
    getcontactsData(){
      this.contactsBlocks = this.$refs.contactsBlockItem;
      this.currentLetter = this.contactsList[0].indexes;
    },
    focusSearchBar(e){
      e.preventDefault();
      this.$router.push('searchContacts');
    },
    toAddFriend(){
       this.$router.push('addFriend');
    },
    toViewNewFriend(){
       this.$router.push('newFriends');
    },
    toFriendDteail(id){
      this.$router.push('friendDeatil/' + id);
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
      
  }
}
</script>
<style scoped>
  .yo-scroll.white_bg{
    background-color: #fff;
  }
  .add_friends_bar{
    height: 55px;
    /*border-top: 1px solid #9a9a9a;*/
    display: flex;
    align-items: center;
    padding-left: 19px;
    background-color: #fff;
  }
  .add_friends_bar .add_friends_img{
    width: 36px;
    height: 36px;
    margin-right: 18px;
  }
  .add_friends_bar .new_friends_text{
    color: #222;
    font-size: 16px;
  }

</style>