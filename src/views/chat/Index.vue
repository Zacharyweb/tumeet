<template>
  <div class="chat-room">
    <header-nav :title="'周杰伦'">
      <div slot="left" @click="toTumeet">
        <img  src="../../assets/img/tumeet_icon.png"/>
      </div> 
      <div slot="right">
        <span style="font-size:14px;">第一层</span>
      </div>  
    </header-nav>

    <v-scroll ref="chatContentWrapper" :on-refresh="onRefresh" :bottom="vScrollBottom" :top="50">
      <div class="chat-msg-wrap"  @touchstart="checkInputPanelHeight">
        <template v-for="chat in chatContent">
          <!-- 左侧消息 -->
          <div v-if="mineId != chat.speakerId" :key="chat.id" class="msg-item left-msg">
            <!-- <span class="msg-time">{{chat.creationTime}}</span> -->
            <img class="user-avatar" :src="chat.avatar || avatar" >
            <div class="chat-content" :class="{'voice-content':chat.chatType === 3}" @click="chatContentClicked(chat)">
              <template v-if="chat.chatType === 1">{{chat.content}}</template>
              <template v-else-if="chat.chatType === 2"><img :src="chat.content"/></template>
              <template v-else>
                <voice-wave :id="chat.id" :play="audioPlay" :play-id="audioPlayId"></voice-wave>
                <span class="voice-time">6"</span>
              </template>
            </div>
          </div>
          <!-- 右侧消息 -->
          <div v-else :key="chat.id" class="msg-item right-msg">
            <span class="msg-time">2017-7-20 19:20:20</span>
            <div class="chat-content" :class="{'voice-content':chat.chatType === 3}" @click="chatContentClicked(chat)">
              <template v-if="chat.chatType === 1">{{chat.content}}</template>
              <template v-else-if="chat.chatType === 2"><img :src="chat.content"/></template>
              <template v-else>
                <span class="voice-time">6"</span>
                <voice-wave :id="chat.id" :play="audioPlay" :play-id="audioPlayId"></voice-wave>
              </template>
            </div>
            <img class="user-avatar" :src="chat.avatar || avatar" >
          </div>
        </template>
      </div>
    </v-scroll>

    <!-- 输入面板 -->
    <div class="input-panel" :class="{'lagrge_inner':voiceInputShow}" :style="{bottom:inputPanelBottom+'px'}" ref="inputPanel">

      <div class="textarea-wrap" v-show="!voiceInputShow">
        <p class="back-text">{{inputMsg}}</p>
        <textarea  v-model="inputMsg" @change="textAreaChange" @focus="textAreaFocus" @blur="textAreaBlur" maxlength="300"></textarea>
      </div>

      <div class="voice-input" v-show="voiceInputShow" @touchstart="beginVoiceInput" @touchend="endVoiceInput">按住进行语音录入</div>

      <span class="voice-btn option-btn" v-show="!voiceInputShow" @click="toVoiceInput">
        <i class="iconfont icon-yuyin1"></i>
      </span>

      <span class="text-btn option-btn" v-show="voiceInputShow" @click="toTextInput">
        <i class="iconfont icon-bianji"></i>
      </span>

      <span class="img-btn option-btn" @click="toSeleceImg">
        <i class="iconfont icon-tupian"></i>
      </span>

      <span class="send-btn" v-show="!voiceInputShow" @click="toSendMsg">发送</span>
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
      <img class="scaleIn" :class="{'scaleOut':imgDetailScaleOut}" src="https://s1.ax1x.com/2017/10/16/JQZeP.jpg" >
    </div>
   
    <!-- 音频 -->
    <audio v-if="!!audioUrl" autoplay ref="audioObj" :src="audioUrl"></audio> 
  </div>
</template>

<script>
import Scroll from "../../components/Scroll.vue";
import HeaderNav from "../../components/HeaderNav.vue";

import T from "../../tool/tool";

export default {
  name: "ChatRoom",
  components: {
    "header-nav": HeaderNav,
    "v-scroll": Scroll,

  },
  data() {
    return {
      mineId:1,
      chatContent:[
        {
          content:'我是内容内容',
          chatType:1, // 1:文字内容 2:图片内容 3:语音内容
          speakerId:2,
          id:'111111',
          avatar:'../../../static/timg.jpeg'
        },
        {
          content:'我是内容内容',
          chatType:1, // 1:文字内容 2:图片内容 3:语音内容
          speakerId:1,
          id:'22222222',
          avatar:'../../../static/timg.jpeg'
        }
      ],


      vScrollBottom: 70,
      inputMsg: "",
      imgDetailShow: false,
      imgDetailScaleOut: false,
      audioPlay: false,
      voiceInputShow: false,
      voiceInputTipsShow: false,

  
      audioPlayId: -1,
      audioUrl: null,
      order: {},


      inputPanelBottom: 20,
      isSendingMsg: false,
      startTime: 0,
      endTime: 0
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
    isMineChat(chat) {
      return false;
    },
    showImgDetail(chat) {
      // wx.previewImage({
      //   current: chat.content, 
      //   urls: [chat.content] 
      // });
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
    toSeleceImg() {
      let that = this;
      // let userId = this.$store.state.user.id;
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
      let that = this;
    },
    playAudio(chat) {
      if (chat.id == this.audioPlayId) {
        this.audioStoped();
        return;
      }

      this.audioUrl = chat.content;
      this.audioPlayId = chat.id;
      this.audioPlay = true;

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
    },
    audioStoped() {
      this.audioPlayId = -1;
      this.audioPlay = false;
      this.audioUrl = null;
    }
  },
  mounted() {
    document.title = "咨询室";
 

    var that = this;

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
  /*position: fixed;*/
  /*bottom: 0;*/

  position: absolute;
  left: 0;
  width: 100%;
  border-top: 1px solid #ccc;
  background-color: #e3e3e3;
  padding: 10px 55px 10px 90px;
}
.input-panel.lagrge_inner{
  padding-right: 15px;
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
  padding: 13px;
  font-size: 14px;
  line-height: 1.5;
}
.voice-input-tips {
  position: fixed;
  top: 30%;
  left: 50%;
  margin-left: -60px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  width: 120px;
  padding: 20px 0;
  text-align: center;
  color: #fff;
}
.voice-input-tips .tips-icon .iconfont {
  font-size: 40px;
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
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
}
.input-panel .option-btn.voice-btn {
  left: 10px;
}
.input-panel .option-btn.text-btn {
  left: 10px;
}
.input-panel .option-btn.img-btn {
  left: 50px;
}

.input-panel .send-btn {
  position: absolute;
  bottom: 15px;
  right: 10px;
  font-size: 16px;
  color: #55cbc4;
}
.chat-msg-wrap {
  padding: 0 15px;
  padding-bottom: 10px;
}
.chat-msg-wrap .msg-item {
  padding-top: 30px;
  padding-bottom: 15px;
  /*margin-top: 15px;*/
  display: flex;
  position: relative;
}

.chat-msg-wrap .msg-item .msg-time {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  padding: 2px 4px;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
}
.chat-msg-wrap .msg-item .user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.chat-msg-wrap .msg-item .chat-content {
  position: relative;
  line-height: 1.5;
  font-size: 14px;
  background: #b4eeb4;
  padding: 10px;
  border-radius: 4px;
  max-width: 240px;
  word-break: break-all;
}
.chat-msg-wrap .msg-item .chat-content::before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  border-width: 6px 12px;
  border-style: solid;
  border-color: #b4eeb4;
  top: 12px;
  border-top-color: transparent;
  border-bottom-color: transparent;
}
.chat-msg-wrap .msg-item.left-msg .user-avatar {
  margin-right: 15px;
}
.chat-msg-wrap .msg-item.left-msg .chat-content::before {
  border-left-color: transparent;
  left: -23px;
}
.chat-msg-wrap .msg-item.right-msg {
  justify-content: flex-end;
}
.chat-msg-wrap .msg-item.right-msg .user-avatar {
  margin-left: 15px;
}
.chat-msg-wrap .msg-item.right-msg .chat-content::before {
  border-right-color: transparent;
  right: -23px;
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
audio {
  position: absolute;
  visibility: hidden;
}
.chat-room .count-timer {
  height: 50px;
  position: fixed;
  top: 0;
  right: 10px;
  color: #fff;
  z-index: 10;
  transform: translateZ(101px);
}
.end-chat-btn {
  position: fixed;
  top: 12px;
  right: 10px;
  color: #fff;
  z-index: 10;
  color: #fff;
  border: 1px solid #fff;
  font-size: 14px;
  line-height: 24px;
  padding: 0 6px;
  border-radius: 4px;
  transform: translateZ(101px);
}
</style>
