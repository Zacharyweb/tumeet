<template>
  <div class="chat-room">
    <header-nav :title="'周杰伦'">
      <div slot="left" @click="toTumeet">
        <img  src="../../assets/img/tumeet_icon.png"/>
      </div> 
      <div slot="right">
        <span style="font-size:14px;">
          第{{ floorText[currentFloor - 1] ? floorText[currentFloor - 1] : currentFloor}}层
       </span>
      </div>  
    </header-nav>
    <div class="chat_topic" :class="{'in_first_floor':currentFloor == 1,'has_new_msg':preMsgNum*1 > 0}">
      <span class="return_prev_icon" v-show="currentFloor > 1 " @click="toPrevFloor"></span>
      <span class="prev_msg_num" v-show="preMsgNum*1 > 0 && currentFloor > 1" @click="toPrevFloor">{{preMsgNum}}</span>
      <p class="text-ellipsis">{{chatTopic}}</p>
    </div>

    <v-scroll ref="chatContentWrapper" :on-refresh="onRefresh" :bottom="vScrollBottom" :top="90">
      <div class="chat-msg-wrap"  @touchstart="checkInputPanelHeight">
        <template v-for="(chat,index) in chatContent">
          <div v-if="chat.creationTime" class="msg-time">{{chat.creationTime}}</div>
          <div :key="chat.id" class="msg-item " :class="{'from_save': chat.fromSave == 1}">
            <img class="user-avatar" :src="chat.avatar || avatar" >
            <div class="chat-content" :class="{'voice-content':chat.chatType === 3}" >
                <!-- 文字 -->
                <chat-msg-item v-if="chat.chatType === 1" @dbclick="createNewFloor(chat,index)">
                  <template >{{chat.content}}</template>
                </chat-msg-item>  

                <!-- 图片 -->
                <template v-else-if="chat.chatType === 2"><img :src="chat.content" @click="showImgDetail(chat.content)"/></template>
              
                <!-- 语音 -->
                <template v-else>
                  <div class="voice-content-inner"
                      :class="{'scaleInOut': audioPlayId == chat.id }" 
                       @click="playAudio(chat,index)" 
                       :style="{width: chat.voiceLength*2 - 20 + 'px'}">
                     <i class="iconfont icon-yuyin1"></i>
                  </div>
                </template>
              
              <span class="next_floor_icon" v-if="chat.chatType === 1 && chat.hasSubTopic == 1" @click="toNextFloor(chat.id)">
                <i class="new_msg_icon" v-show="chat.subTopicMsgNum > 0">{{chat.subTopicMsgNum}}</i>
              </span>

              <span class="voice_time" v-if="chat.chatType === 3">
                  {{chat.voiceLength}}s
                  <i class="unlisten_icon" v-show="chat.listened != 1"></i>
              </span>
            </div>
          </div>
        </template>
      </div>
    </v-scroll>

    <!-- 输入面板 -->
    <div class="input-panel" :style="{bottom:inputPanelBottom+'px'}" ref="inputPanel">

      <div class="textarea-wrap" v-show="!voiceInputShow">
        <p class="back-text">{{inputMsg}}</p>
        <textarea  v-model="inputMsg" @change="textAreaChange" @focus="textAreaFocus" @blur="textAreaBlur" maxlength="300"></textarea>
      </div>

      <div class="voice-input" v-show="voiceInputShow" @touchstart="beginVoiceInput" @touchend="endVoiceInput">按住进行语音录入</div>
      <span class="voice-btn option-btn" v-show="!voiceInputShow" @click="toVoiceInput"></span>

      <span class="text-btn option-btn" v-show="voiceInputShow" @click="toTextInput">
        <i class="iconfont icon-bianji"></i>
      </span>

      <span class="emoj-btn option-btn" @click="toSeleceEmoj"></span>
      <span class="show-more-btn option-btn"  @click="toShowMoreOptions"></span>
    </div>

    <!-- 输入面板下方垫片 -->
    <div class="input-panel-shim" ref="inputPanelShim" :style="{height:inputPanelBottom + 'px'}"></div>

    <!-- 语音录入提示 -->
    <div class="voice-input-tips" v-show="voiceInputTipsShow">
      <p class="tips-icon"><span class="iconfont icon-yuyin"></span></p>
      <p class="tips-text">正在录入语音</p>
    </div>
     
    <!-- 图片放大查看 -->
    <div class="img-detail-panel" v-if="imgDetailShow" @click="hideImgDetail">
      <img class="scaleIn" :class="{'scaleOut':imgDetailScaleOut}" :src="currenDetailImgSrc" >
    </div>
   
    <!-- 音频 -->
    <audio v-if="!!audioUrl" autoplay ref="audioObj" :src="audioUrl"></audio> 
  </div>
</template>

<script>
import Scroll from "../../components/Scroll.vue";
import HeaderNav from "../../components/HeaderNav.vue";
import ChatMsgItem from "../../components/ChatMsgItem.vue";

import T from "../../tool/tool";

export default {
  name: "ChatRoom",
  components: {
    "header-nav": HeaderNav,
    "v-scroll": Scroll,
    'chat-msg-item':ChatMsgItem

  },
  data() {
    return {
      mineId:1,
      chatTopic:'',
      chatContent:[
        {
          content:'我是内容内容',
          chatType:1, // 1:文字内容 2:图片内容 3:语音内容
          speakerId:2,
          id:'111111',
          avatar:'http://www.zjresume.com/tumeet/timg.jpeg',
          creationTime:'2017-08-09',
          hasSubTopic:1,
          subTopicMsgNum:6
        },
        {
          content:'我是内容内容',
          chatType:1, // 1:文字内容 2:图片内容 3:语音内容
          speakerId:1,
          id:'22222222',
          avatar:'http://www.zjresume.com/tumeet/timg.jpeg',
          hasSubTopic:1,
          subTopicMsgNum:0
        },
        {
          content:'我是内容内容',
          chatType:1, // 1:文字内容 2:图片内容 3:语音内容
          speakerId:2,
          id:'111112222222221',
          avatar:'http://www.zjresume.com/tumeet/timg.jpeg',
          creationTime:'2017-08-09',
          hasSubTopic:0,
          subTopicMsgNum:0
        },
        {
          chatType:3,
          content:'https://code.ziqiangxuetang.com/demo/horse.ogg',
          avatar:'http://www.zjresume.com/tumeet/timg.jpeg',
          id:'66611',
          speakerId:1,
          voiceLength:30,
          

        },
        {
          chatType:3,
          content:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
          avatar:'http://www.zjresume.com/tumeet/timg.jpeg',
          id:'66213',
          speakerId:1,
          voiceLength:60

        },
        {
          chatType:2,
          avatar:'http://www.zjresume.com/tumeet/timg.jpeg',
          id:'6631asd23',
          speakerId:1,
          content:'http://www.zjresume.com/tumeet/timg.jpeg',

        },
        {
          chatType:3,
          content:'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
          avatar:'http://www.zjresume.com/tumeet/timg.jpeg',
          id:'6661213211',
          speakerId:1,
          voiceLength:30,
          listened:0,

        },
        {
          chatType:3,
          content:'https://code.ziqiangxuetang.com/demo/horse.ogg',
          avatar:'http://www.zjresume.com/tumeet/timg.jpeg',
          id:'66221313',
          speakerId:1,
          voiceLength:60,
          listened:1,
          fromSave:1

        },
        {
          chatType:2,
          avatar:'http://www.zjresume.com/tumeet/timg.jpeg',
          id:'663122121321323',
          speakerId:1,
          content:'http://www.zjresume.com/tumeet/timg.jpeg',
          fromSave:1

        },
        {
          content:'我是内容内容',
          chatType:1, // 1:文字内容 2:图片内容 3:语音内容
          speakerId:1,
          id:'2222222131222',
          avatar:'http://www.zjresume.com/tumeet/timg.jpeg',
          hasSubTopic:1,
          subTopicMsgNum:0,
          fromSave:1
        },
      ],
      currentFloor:1,
      preMsgNum:3,
      nextMsgNum:6,

      imgDetailShow: false,
      imgDetailScaleOut: false,
      currenDetailImgSrc:'',


      vScrollBottom: 70,
      inputMsg: "",
      isSendingMsg: false,

      
      voiceInputShow: false,
      voiceInputTipsShow: false,
      startTime: 0,
      endTime: 0,


      audioPlay: false,
      audioPlayId: -1,
      audioUrl: null,

      order: {},

      inputPanelBottom: 0,

      floorText:['一','二','三','四','五','六','七','八','九','十']


    };
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    toTumeet(){
      this.$router.push('/');
    },
    scrollToBottom() {
      this.$refs.chatContentWrapper.toBottom(this.inputPanelBottom);
    },
    chageFloor(flag){
      let params = this.$route.params;
      let currentId = params.id;
      let nextFloor;
      if(flag == 1){
         nextFloor = params.floor*1 - 1;
      }else{
         nextFloor = params.floor*1 + 1;
      }
      this.$router.push('/chat/' + currentId + '/' + nextFloor);
    },
    toPrevFloor(){
      this.chageFloor(1);
    },
    toNextFloor(){
      this.chageFloor(0);
    },
    createNewFloor(chat,index){
        if(chat.hasSubTopic == 1){
           this.chageFloor(0);
        }else{
          chat.hasSubTopic = 1;
          this.chatContent.splice(index,1,chat);
          T.showToast({text:"创建新层成功~"});
          setTimeout(()=>{
               this.chageFloor(0);
          },500);
        }
    },

    showImgDetail(src) {
      this.imgDetailShow = true;
      this.imgDetailScaleOut = false;
      this.currenDetailImgSrc =  src;
    },
    hideImgDetail() {
      this.imgDetailScaleOut = true;
      setTimeout(() => {
        this.imgDetailShow = false;
      }, 200);
    },

    toVoiceInput() {
      this.voiceInputShow = true;
      this.vScrollBottom = this.inputPanelBottom + 70;
    },
    toShowMoreOptions() {
      console.log('更多功能');
    },
    toSeleceEmoj(){
      console.log('选择表情');
    },
    toTextInput() {
      this.voiceInputShow = false;
      this.vScrollBottom =
        this.inputPanelBottom + this.$refs.inputPanel.offsetHeight;
    },
    checkInputPanelHeight() {
      this.vScrollBottom =
        this.inputPanelBottom + this.$refs.inputPanel.offsetHeight;
    },
    toSendMsg() {
      if (this.isSendingMsg) {
        return;
      }
      this.isSendingMsg = true;
    },
    playAudio(chat,index) {
      if (chat.id == this.audioPlayId) {
        this.audioStoped();
        return;
      };
      if(chat.listened == 0 || !chat.listened){
        chat.listened = 1;
        this.chatContent.splice(index,1,chat);
      };
      this.audioUrl = chat.content;
      this.audioPlayId = chat.id;
      this.audioPlay = true;
    },
    audioStoped() {
      this.audioPlayId = -1;
      this.audioPlay = false;
      this.audioUrl = null;
    },
    beginVoiceInput(e) {
      e.preventDefault();
      this.startTime = new Date().getTime();
      this.voiceInputTipsShow = true;
    },
    endVoiceInput() {
      this.endTime = new Date().getTime();
      if( this.endTime - this.startTime < 1000){
          this.endTime = 0;
          this.startTime = 0;
          T.showToast({text:"录音时间太短！"});
          this.voiceInputTipsShow = false;
          return;
      };
      this.voiceInputTipsShow = false;
    },
    textAreaChange() {},
    textAreaFocus() {},
    textAreaBlur() {},

    chatContentClicked(chat) {
      if (chat.chatType === 1) return;
      if (chat.chatType === 2) {
        this.showImgDetail(chat);
      } else {
        this.playAudio(chat);
      }
    }

  },
  mounted() {
    var that = this;
    // 获取第一层的数据
    this.chatTopic = '层级' + this.$route.params.floor*1 + '的主题';
    this.currentFloor = this.$route.params.floor*1;
  },
  beforeRouteUpdate (to, from, next) {
    this.chatTopic = '层级' + to.params.floor*1 + '的主题';
    this.currentFloor = to.params.floor*1;
    // 这里重新去获取数据
    next();
  },
  destroyed() {
    // chat.stop();
  },
  watch: {
    order: {
      handler() {
        this.$nextTick(() => {
          this.isSendingMsg = false;
          this.scrollToBottom();
        });
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.input-panel {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  width: 100%;
  border-top: 1px solid #ccc;
  background-color: #e3e3e3;
  padding: 10px 87px 10px 50px;
}

.input-panel-shim {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #e3e3e3;
}
.voice-input {
  min-height: 44px;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-align: center;
  line-height: 44px;
  background-color: #f1f1f1;
  -webkit-user-select: none;
}
.input-panel .textarea-wrap {
  position: relative;
  min-height: 46px;
}
.input-panel .back-text {
  word-break: break-all;
  max-height: 95px;
  overflow: hidden;
  padding: 13px;
  font-size: 14px;
  line-height: 1.5;
}
.voice-input-tips {
  position: fixed;
  top: 30%;
  left: 50%;
  margin-left: -60px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  width: 120px;
  padding: 25px 0;
  text-align: center;
  color: #fff;
}
.voice-input-tips .tips-icon{
  margin-bottom: 10px;
}
.voice-input-tips .tips-icon .iconfont {
  font-size: 44px;
}
.input-panel textarea {
  box-sizing: border-box;
  position: absolute;
  top: 0px;
  left: 0px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  padding: 11px;
  font-size: 14px;
  line-height: 1.5;
}
.input-panel .option-btn {
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 15px;
  border-radius: 50%;

}
.input-panel .option-btn.voice-btn {
  background: url(../../assets/img/voice_btn.png) no-repeat 0 0;
  background-size: auto 100%;
  left: 10px;
}
.input-panel .option-btn.text-btn{
  border: 1px solid #7f8080;
  left: 10px;
  text-align: center;
  line-height: 30px;
}
.input-panel .option-btn.text-btn .iconfont{
  font-size: 20px;
  color: #7f8080;
}
.input-panel .option-btn.emoj-btn {
  background: url(../../assets/img/emoj_btn.png) no-repeat 0 0;
  background-size: auto 100%;
  right: 50px;
}
.input-panel .option-btn.show-more-btn {
  background: url(../../assets/img/show_more_btn.png) no-repeat 0 0;
  background-size: auto 100%;
  right: 10px;
}




.chat-msg-wrap {
  margin: 0 20px;
  min-height: 100%;
  padding-bottom: 10px;
}
.chat-msg-wrap .msg-time{
  text-align: center;
  color: #a6a6a6;
  font-size: 12px;
  padding: 11px 0;
  line-height: 12px;
}
.chat-msg-wrap .msg-item {
  padding: 0px 0 14px 10px;
  display: flex;
  position: relative;
}
.chat-msg-wrap .msg-item::before{
  content: '';
  position: absolute;
  left: -4px;
  top: 20px;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #002e9e;
}
.chat-msg-wrap .msg-item.from_save::before{
  background-color: #da5514;
}

.chat-msg-wrap .msg-item .user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 15px;
}
.chat-msg-wrap .msg-item .chat-content {
  position: relative;
  line-height: 1.5;
  font-size: 14px;
  background-color: #67bfe7;
  padding: 10px;
  border-radius: 4px;
  max-width: 240px;
  word-break: break-all;
  color: #fff;
}
.chat-msg-wrap .msg-item.from_save .chat-content{
  background-color: #da5514;
}
.chat-msg-wrap .msg-item .chat-content::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  border-width: 8px 12px;
  border-style: solid;
  border-color: #67bfe7;
  top: 12px;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  left: -22px;
}
.chat-msg-wrap .msg-item.from_save .chat-content::before {
  border-right-color:  #da5514;

}
.chat-msg-wrap .msg-item .next_floor_icon{
     position: absolute;
     right: -38px;
     top: 0px;
     width: 30px;
     height: 40px;
     background: url(../../assets/img/to_next_floor.png) no-repeat 0 0;
     background-size: auto 100%;
}
.chat-msg-wrap .msg-item.from_save .next_floor_icon{
    background: url(../../assets/img/to_next_floor2.png) no-repeat 0 0;
    background-size: auto 100%;
}
.chat-msg-wrap .msg-item .next_floor_icon .new_msg_icon{
  position: absolute;
  right: 4px;
  top: -4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  color: #fff;
  background-color: #d70012;
  font-size: 10px;
  text-align: center;
  line-height: 16px;
}

.chat-msg-wrap .msg-item .voice_time{
  position: absolute;
  right: -30px;
  top: 0px;
  font-size: 14px;
  color: #a6a6a6;
}
.chat-msg-wrap .msg-item .voice_time .unlisten_icon{
   position: absolute;
   left: 50%;
   margin-left: -3px;
   bottom: -4px;
   width: 6px;
   height: 6px;
   border-radius: 50%;
   background-color: #d70012;
}
.chat-msg-wrap .msg-item .chat-content img {
  width: 120px;
  vertical-align: bottom;
}

.img-detail-panel {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  z-index: 11;
}
.img-detail-panel img {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
}


.scaleInOut {
  animation: scaleInOut  0.6s steps(60) infinite;
}
@keyframes scaleInOut {
  from {
    opacity: 0.3;
    transform: scale(1, 1);
  }
  to {
    opacity: 1;
    transform: scale(1, 1.2);
  }
}


.scaleIn {
  animation: scaleIn 0.3s;
}
@keyframes scaleIn {
  from {
    transform: scale(0.3, 0.3) translateY(0%);
  }
  to {
    transform: scale(1, 1) translateY(-50%);
  }
}
.scaleOut {
  animation: scaleOut 0.3s;
}
@keyframes scaleOut {
  from {
    transform: scale(1, 1) translateY(-50%);
  }
  to {
    transform: scale(0.3, 0.3) translateY(0%);
  }
}








.chat-msg-wrap .msg-item .chat-content.voice-content {
  display: flex;
  align-items: center;
}
.chat-msg-wrap .msg-item .chat-content.voice-content .voice-content-inner{
  min-width: 40px!important;
  max-width: 180px!important;
}
.chat-msg-wrap .msg-item .chat-content.voice-content .iconfont{
  font-size: 14px;
}
audio {
  position: absolute;
  visibility: hidden;
}











.yo-scroll::before{
  content: '';
  position: fixed;
  left: 20px;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: #002e9e;

}

.chat_topic{
  color: #fff;
  background-color: #002e9e;
  padding: 10px 16px;
  padding-left: 36px;
  font-size: 16px;
  line-height: 20px;
  position: relative;
  z-index: 10;
}

.chat_topic.in_first_floor{
  padding-left: 32px;
}
.chat_topic.in_first_floor::before{
  content: '';
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
}
.chat_topic .return_prev_icon{
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 18px;
  background: url(../../assets/img/left_arrow.png) no-repeat 0 0;
  background-size: auto 100%;
}
.chat_topic.has_new_msg{
  padding-left: 54px;
}
.chat_topic .prev_msg_num{
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  width:18px;
  height: 18px;
  border-radius: 50%;
  color: #fff;
  background-color: #d70012;
  font-size: 12px;
  text-align: center;
  line-height: 18px;
}




</style>
