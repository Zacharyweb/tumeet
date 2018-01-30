<template>
  <div>
    <search-bar :keyword.sync="keyword" :auto-focus="true"></search-bar>
    <v-scroll :on-refresh="onRefresh" :bottom="0" :top="40">
      <div class="search_result_block" v-if="keyword">
         <div class="search_result_cate">搜索结果</div>
            <ul class="contacts_list">
              <li class="contacts_item" v-for="person in resultList" @click="toFriendDteail(person.id)">
                  <img class="contacts_avatar" :src="person.avatar"/>
                  <span class="contacts_name">{{person.name}}</span>
              </li>
            </ul>
      </div>

    </v-scroll>
  </div>
</template>

<script>
import SearchBar  from '../components/SearchBar.vue'
import Scroll  from '../components/Scroll.vue'
import T from '../tool/tool'
export default {
  name: 'SearchContacts',
  components:{
    'search-bar':SearchBar,
    'v-scroll': Scroll
  },
  data () {
    return {
      keyword:'',
      resultList: [
        {
          name:'Alili',
          avatar:'../../static/timg.jpeg',
          id:'0',
          tumeet:'alang1987',
          added:1
        },
        {
          name:'爱丽丝',
          avatar:'../../static/timg.jpeg',
          id:'1',
          tumeet:'alang1987',
          added:0
        }
      ]
    }
  },
  methods:{
    onRefresh(done){
      setTimeout(()=>{
        done();
      },1000)
    }
  
  },
  mounted(){
    
  },
  watch: {
    keyword: function(newKeyword) {
      let keyword = newKeyword;
      if (!keyword) {
        return;
      };

   
   
    }
  },
}
</script>
<style scoped>
/**/
</style>