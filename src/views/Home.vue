<template>
  <div>
      <search-bar :on-focus="focusSearchBar" :show-cancel="false"></search-bar>
      <v-scroll :on-refresh="onRefresh" :bottom="50" :top="60">
        
        <ul class="slider_edit_list">

          <li class="slider_edit_item" v-for="(item,index) in chatArr">
            <div class="slider_edit_item_panel" 
                 :class="{'lock_close': sliderIndex != index }"
                 :style = "{ left: slideLeft + 'px' }"
                 ref="sliderEditItemPanel"
                 @touchstart="handleTouchStart($event,index)"
                 @touchmove="handleTouchMove($event,index)"
                 @touchend="handleTouchEnd($event,index)"
             >
              <div class="chat_item">
                <img class="user_avater" src="../../static/timg.jpeg">
                <div class="chat_content">
                  <p class="chat_title text-ellipsis">江帆：上海房产过户手续准备资金</p>
                  <p class="chat_abstract text-ellipsis">跳转界面的设计与更新</p>
                  <span class="chat_time">2017/8/6</span>
                </div>
              </div>
            </div>

            <div class="edit_btns">
              <div class="edit_btn btn_red">删除</div>
              <div class="edit_btn btn_blue">存档</div>
            </div>

          </li>
    <!--       <li class="slider_edit_item"></li>
          <li class="slider_edit_item"></li>
          <li class="slider_edit_item"></li> -->
        </ul>
        
      </v-scroll>
    <bottom-nav :nav-index="0"></bottom-nav>  
  </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav.vue'
import SearchBar  from '../components/SearchBar.vue'
import TabBar  from '../components/TabBar.vue'
import CategoryBar  from '../components/CategoryBar.vue'
import Scroll  from '../components/Scroll.vue'
import BottomNav from '../components/BottomNav.vue'
import T from '../tool/tool'

export default {
  name: 'Home',
  components:{
    'v-scroll': Scroll,
    'search-bar':SearchBar,
    'tab-bar':TabBar,
    'category-bar':CategoryBar,
    'bottom-nav': BottomNav,
    'header-nav': HeaderNav,
  },
  data () {
    return {

      slideLeft:0,
      beginOffset:0,
      offsetLeft:0,
      startLeft:0,

      sliderTimer:null,
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

    lockWindow(e){
        // e.preventDefault();
    },
    resetSliderData(){
      this.slideLeft = 0;
    },
    handleTouchStart(e,index){
        // this.resetSliderData();
        
        clearInterval(this.sliderTimer);
        // 获取当前对象的偏移位置
        let offsetLeft = e.currentTarget.offsetLeft;

        // 如果之前操作的对象是当前对象
        if(this.sliderIndex == index){
           // 过处于展开状态
          if(offsetLeft == -150){
             // 关闭动画
             this.sliderIndex = -1;

             setTimeout(()=>{
                this.resetSliderData();
             },500)

             return;
          }
        }else{
           // 否则直接先把位置重置为0
           this.resetSliderData();
        };

        let start = e.touches[0].clientX;

        // 更改当前操作对象
        this.sliderIndex = index;

        // 记录touch初始位置
        this.startLeft = start;

        // 记录对象touch是左偏移位置
        this.offsetLeft = offsetLeft;

        // 触摸点跟左偏移位置之间的距离
        this.beginOffset = start - offsetLeft;
        
        document.body.addEventListener('touchmove',this.lockWindow);
    },
    handleTouchMove(e,index){
      
        let slideLeft = e.touches[0].clientX - this.beginOffset;
        if( slideLeft < -150){
            slideLeft = -150;
        };
        if(slideLeft > 0){
            slideLeft = -0;
        };
        this.slideLeft = slideLeft;
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    },
    handleTouchEnd(e,index){
        let that = this;
        let endLeft = e.changedTouches[0].clientX;
        let moveLength = this.startLeft - endLeft;

        if(moveLength > 20){
            if(this.slideLeft != -150){
                this.itemSlide('open');
            };
        }else if(moveLength < -20){
            if(this.slideLeft != 0){
                this.itemSlide('close');
            };
        }else{
            if(moveLength >= 0 && this.offsetLeft == 0){
               this.itemSlide('close');
            };
            if(moveLength < 0 && this.offsetLeft == -150){
               this.itemSlide('open');
            };
        };
        document.body.removeEventListener('touchmove',this.lockWindow);
    },
    itemSlide:function(type){
        let that = this;
        if(type == 'open'){
          this.sliderTimer = setInterval(function(){
              that.slideLeft--;
              if(that.slideLeft <= -150){
                 that.slideLeft = -150;
                 clearInterval(that.sliderTimer);   
              };
          },1);
        };
        if(type == 'close'){
          this.sliderTimer = setInterval(function(){
              that.slideLeft++;
              if(that.slideLeft >= 0){
                 that.slideLeft = 0;
                 clearInterval(that.sliderTimer);   
              };
          },1);
        };
    }
  },
  mounted(){
     document.title = '首页';
     // var sliderEditItemPanel = this.$refs.sliderEditItemPanel;
     // console.log(sliderEditItemPanel);
     // console.log(sliderEditItemPanel.offsetLeft);
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
    .slider_edit_list .slider_edit_item .slider_edit_item_panel{
      box-sizing: border-box;
      padding:0 7.5px;
      position: absolute;
      top: 0;
      /*left: 0;*/
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
      background-color: #fff;
    }
    .slider_edit_list .slider_edit_item .slider_edit_item_panel.lock_close{
     transition: all 0.5s;
     left:0!important;
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
      right: 0;
      top:2px;
      color: #a3a3a3;
      font-size: 14px;
    }



  
</style>