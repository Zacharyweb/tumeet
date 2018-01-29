<template>
    <div class="search-bar" :class="{'blue_bg':showCancel}">
      <input  type="text" class="keywords-input" :class="{'type2':showCancel}" 
              placeholder="搜索" v-model="searchKey" 
              @focus="focusSearchBar($event)" ref="searchInput">
      <img src="../assets/img/search_bar_icon1.png" 
           v-show="!showCancel" 
           class="search_bar_icon search_icon"/>
      <img src="../assets/img/search_bar_icon2.png" 
           class="search_bar_icon voice_icon" 
           :class="{'more_left':showCancel}"/>
      <span v-if="showCancel" 
            class="cancel-btn"
            @click="closeSearchPage"
      >取消</span>
    </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    showCancel:{
      type: Boolean,
      default: true
    },
    onFocus: {
      type: Function,
      default: undefined,
      require: false
    },
    autoFocus:{
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchKey:'',
    }
  },
  methods:{
    focusSearchBar($event){
      if(this.onFocus){
        this.onFocus($event);
      }
    },
    closeSearchPage(){
       this.$router.go(-1);
    }
  },
  mounted(){
    if(this.autoFocus){
      this.$refs.searchInput.focus();
    }
  }
}
</script>

<style scoped>
   .search-bar{
    height: 40px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    padding:0 7.5px;
    background-color:#e0dfe5;
    position: relative;
  }
  .search-bar.blue_bg{
    background-color: #67bfe7;
  }
  .search-bar input{
    box-sizing:border-box;
    flex: 1;
    height:28px;
    text-align: center;
    padding: 0 30px;
    border:1px solid #ababad;
    border-radius: 6px;
    background-color:#fff;
    color:#333;
    font-size:14px;
    line-height:36px;
  }
  input::-webkit-input-placeholder{ 
    color: #b5b5b5;
  }
  input::-moz-input-placeholder{ 
    color: #b5b5b5;
  }
  input::-ms-input-placeholder{
    color: #b5b5b5;
  }
  .search-bar input.type2{
    text-align: left;
    padding-left: 15px;
  }
  .search-bar .search_bar_icon{
    position: absolute;
    top: 50%;
    margin-top: -7px;
    height: 14px;
    width: auto;
  }
  .search-bar .search_icon{
    left:50%;
    transform: translateX(-50%);
    margin-left: -25px;
  }
  .search-bar .voice_icon{
     right: 20px;
  }
/*  .search-bar .search_icon.more_left{
     margin-left: -45px;
  }*/
  .search-bar .voice_icon.more_left{
      right: 56px;
  }
  .search-bar .cancel-btn{
    padding-left: 10px;
    font-size: 14px;
    color: #fff;
    white-space:nowrap;
  }
</style>
