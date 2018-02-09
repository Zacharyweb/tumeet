<template>
  <div>
    <div class="chat_msg_item" :class="{'not_select':!canSelectText}" ref="chatMsgItem" @touchstart.stop="handlerTouchStart"  @touchend="handlerTouchEnd">
      <slot></slot>
    </div>
    <ul v-show="actionPanelShow" @touchstart.stop="touchstartActionPanel" class="action_for_msg">
      <li class="action_item" @click.stop="copy">复制</li>
      <li class="action_item" @click.stop="paste">粘贴</li>
      <li class="action_item" @click.stop="revoke">撤销</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ChatMsgItem',
  props: {
    navIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      touchStartTime:0,
      canSelectText:false,
      fristTouch:0,
      actionPanelShow:false
    }
  },
  methods:{
   handlerTouchStart(e){
    this.canSelectText = false;
    this.touchStartTime = +new Date();
    if(this.fristTouch == 0){
      this.fristTouch = +new Date(); 
    }else{
        var secondTouch = +new Date();
        if(secondTouch - this.fristTouch < 300){
            this.$emit('dbclick');
        }
        this.fristTouch = 0 ;
    }
   },
   handlerTouchEnd(e){
    var endTime = +new Date();
    var chatMsgItem = this.$refs.chatMsgItem;
    if(endTime - this.touchStartTime > 1000){
       // this.canSelectText = true;
       // this.$nextTick(()=>{
       //  this.selectAllText();
       // })
       this.actionPanelShow = true;
    }
   },
    selectAllText() {
        var text = this.$refs.chatMsgItem;
        if (document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        };
    },
    copy(){
       this.canSelectText = true;
       this.actionPanelShow = false;
       this.$nextTick(()=>{
        this.selectAllText();
       })
       
    },
    paste(){

    },
    revoke(){

    },
    touchstartActionPanel(){

    }
  },
  mounted(){
    document.addEventListener('touchstart',()=>{
      this.actionPanelShow = false;
    })
  }
}
</script>
<style scoped>
.chat_msg_item{
  position: relative;
}
.chat_msg_item.not_select{
  user-select: none;
}
.action_for_msg{
  position: absolute;
  background-color: rgba(0,0,0,0.9);
  border-radius: 6px;
  top: 0;
  left: 50%;
  transform: translate(-50%, -95%);
  display: flex;
  z-index: 2;

}
.action_for_msg::after{
  content: '';
  position: absolute;
  border-width: 10px 10px 10px 10px;
  border-style: solid;
  border-color: transparent;
  border-top-color: #000;
  opacity: 0.9;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 90%);
}
.action_for_msg .action_item{
  color: #fff;
  padding: 6px 12px;
  line-height: 20px;
  font-size: 16px;
  height: 20px;
  white-space: nowrap;

}
.action_for_msg .action_item+.action_item{
  border-left: 1px solid #fff;
}
</style>