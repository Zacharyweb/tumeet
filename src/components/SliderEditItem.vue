<template>
  <div class="slider_edit_item_panel" 
       :class="{'lock_close': sliderIndex != keyId }"
       :style = "{ left: slideLeft + 'px' }"
       ref="sliderEditItemPanel"
       @touchstart="handleTouchStart($event,keyId)"
       @touchmove="handleTouchMove($event,keyId)"
       @touchend="handleTouchEnd($event,keyId)"
  >
  <slot>暂未设置内容</slot>
  </div>
</template>
<script>
import T from '../tool/tool'
export default {
  name: 'SliderEditItem',
  props:{
     keyId:{
        required: true
      },
      sliderIndex:{
        default:-1
      },
      maxLeft:{
        type:Number,
        default:-150
      }
    },
  data () {
    return {
      slideLeft:0,
      beginOffset:0,
      offsetLeft:0,
      startLeft:0,
      sliderTimer:null,

      maxLeftOffset:-75
    }
  },
  methods:{
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
          if(offsetLeft == this.maxLeftOffset){
             // 关闭动画
             // this.sliderIndex = -1;
             // setTimeout(()=>{
             //    this.resetSliderData();
             // },500)
             // return;
          }
        }else{
           // 否则直接先把位置重置为0
           this.resetSliderData();
        };
        let start = e.touches[0].clientX;
        // 更改当前操作对象
     
        // this.sliderIndex = index;
        this.$emit('update:sliderIndex', index);

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
        if( slideLeft < this.maxLeftOffset){
          slideLeft = this.maxLeftOffset;
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
            if(this.slideLeft != this.maxLeftOffset){
                this.itemSlide('open');
            };
        }else if(moveLength < -20){
            if(this.slideLeft != 0){
                this.itemSlide('close');
            };
        }else{
            if(moveLength == 0){
                if(this.offsetLeft == 0){
                   this.$emit('onlytap',index);
                }     
            };
            if(moveLength > 0 && this.offsetLeft == 0){
               this.itemSlide('close');
            };
            if(moveLength < 0 && this.offsetLeft == this.maxLeftOffset){
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
              if(that.slideLeft <= that.maxLeftOffset){
                 that.slideLeft = that.maxLeftOffset;
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

     this.maxLeftOffset = this.maxLeft;
  },

}
</script>

<style scoped>
  .slider_edit_item_panel{
    box-sizing: border-box;
    padding:0 7.5px;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background-color: #fff;
  }
  .slider_edit_item_panel.lock_close{
   transition: all 0.5s;
   left:0!important;
  }
</style>
