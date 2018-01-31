<template>
  <div>
    <search-bar :keyword.sync="keyword" :auto-focus="true"></search-bar>
    <v-scroll :on-refresh="onRefresh" :bottom="0" :top="40">
      <div class="search_result_block" v-if="keyword">
         <div class="search_result_cate">联系人</div>
         <ul class="search_result_list">
           <li class="search_result_item">
             <img class="search_result_pic" src="../../../static/timg.jpeg">
             <span class="search_result_text">王尼玛</span>
           </li>
           <li class="search_result_item">
             <img class="search_result_pic" src="../../../static/timg.jpeg">
             <span class="search_result_text">王尼玛</span>
           </li>
           <li class="search_result_item">
             <img class="search_result_pic" src="../../../static/timg.jpeg">
             <span class="search_result_text">王尼玛</span>
           </li>
         </ul>
         <div class="search_result_bottom">查看更多联系人<span class="right_arrow"></span></div> 
      </div>

      <div class="search_result_block" v-if="keyword">
         <div class="search_result_cate">主题</div>
         <ul class="search_result_list">
           <li class="search_result_item">
             <img class="search_result_pic" src="../../../static/timg.jpeg">
             <span class="search_result_text">王尼玛去欧洲旅行</span>
           </li>
           <li class="search_result_item">
             <img class="search_result_pic" src="../../../static/timg.jpeg">
             <span class="search_result_text">王尼玛去欧洲旅行</span>
           </li>
           <li class="search_result_item">
             <img class="search_result_pic" src="../../../static/timg.jpeg">
             <span class="search_result_text">王尼玛去欧洲旅行</span>
           </li>
         </ul>
         <div class="search_result_bottom">查看更多主题<span class="right_arrow"></span></div> 
      </div>

      <div class="search_result_block" v-if="keyword">
         <div class="search_result_cate">对话记录</div>
         <ul class="search_result_list">
           <li class="search_result_item">
             <img class="search_result_pic" src="../../../static/timg.jpeg">
             <div class="search_result_content">
                <span class="search_result_text">王尼玛去欧洲旅行</span>
                <span class="search_result_subtext">共5条相关记录</span>
             </div>
           </li>
           <li class="search_result_item">
             <img class="search_result_pic" src="../../../static/timg.jpeg">
             <div class="search_result_content">
                 <span class="search_result_text">王尼玛去欧洲旅行</span>
                 <span class="search_result_subtext">共5条相关记录</span>
             </div>
           </li>
           <li class="search_result_item">
             <img class="search_result_pic" src="../../../static/timg.jpeg">
             <div class="search_result_content">
                <span class="search_result_text">王尼玛去欧洲旅行</span>
                <span class="search_result_subtext">共5条相关记录</span>
             </div>
           </li>
         </ul>
         <div class="search_result_bottom">查看更多对话记录<span class="right_arrow"></span></div> 
      </div>
       
    </v-scroll>
  </div>
</template>

<script>
import SearchBar  from '../../components/SearchBar.vue'
import Scroll  from '../../components/Scroll.vue'
import T from '../../tool/tool'
export default {
  name: 'SearchResult',
  components:{
    'search-bar':SearchBar,
    'v-scroll': Scroll
  },
  data () {
    return {
      keyword:''
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
   .yo-scroll{
       background-color: #fff;
   }
  .search_result_block{
    background-color: #fff;
    padding-left: 14px;
    margin-bottom: 5px;
  }
  .search_result_cate{
    font-size: 14px;
    color: #777;
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid #585858;
  }
  .search_result_list .search_result_item{
    display: flex;
    align-items: center;
    height: 65px;
    border-bottom: 1px solid #f1f1f1;
  }
  .search_result_list .search_result_item .search_result_pic{
    width: 49px;
    height: 49px;
    border-radius: 4px;
    margin-right: 10px;
  }
  .search_result_list .search_result_item .search_result_content{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .search_result_list .search_result_item .search_result_text{
    font-size: 15px;
    color: #222;
  }
  .search_result_list .search_result_item .search_result_subtext{
    font-size: 12px;
    color: #777;
    margin-top: 5px;
  }
  .search_result_bottom{
    position: relative;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    color: #666;
    padding-left: 24px;
    background: url(../../assets/img/search_bar_icon1.png) no-repeat 0 center;
    background-size: auto 16px;
  }
  .search_result_bottom .right_arrow{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    right: 15px;
    width: 9px;
    height: 13px;
    background: url(../../assets/img/right_arrow.png) no-repeat 0 center;
    background-size: auto 13px;
  }

</style>