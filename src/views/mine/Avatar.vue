<template>
  <div>
    <header-nav :title="'个人头像'">
      <div class="nav_custom_left" slot="left" @click="toBack">
         <img  src="../../assets/img/left_arrow.png"/>
         <span class="nav_left_text">个人详情</span>
      </div>
      <img slot="right" src="../../assets/img/detail_dots.png"  @click="toEditAvatar"/>
    </header-nav>
    <v-scroll :on-refresh="onRefresh" :bottom="0" :top="50">
        <img class="avatar-img" :src="avatarUrl"/>
    </v-scroll>
    <input type="file" class="upload-btn" ref="uploadBtn" @change="uploadImgChange($event)" >
    <div>
        <div class="action_select_list_mask" v-show="actionSelectShow" @click="actionSelectShow = false"></div>
        <ul class="action_select_list" :class="{show:actionSelectShow}">
          <li class="action_select_item" @click="takePhoto">拍照</li>
          <li class="action_select_item" @click="choosePhoto">从手机相册选择</li>
          <li class="action_select_item" @click="savePhoto">保存图片</li>
          <li class="action_select_item new_block" @click="actionSelectShow = false">取消</li>
        </ul>
    </div>
  </div>
</template>

<script>

import HeaderNav from '../../components/HeaderNav.vue'

import Scroll  from '../../components/Scroll.vue'

import T from '../../tool/tool'

export default {
  name: 'Avatar',
  components:{
    'header-nav': HeaderNav,
    'v-scroll': Scroll,
  },
  data () {
    return {
       actionSelectShow:false,
       avatarUrl:'../../../static/timg.jpeg'
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
    toEditAvatar(){
      this.actionSelectShow = true;
    },
    takePhoto(){

    },
    choosePhoto(){
      let uploadBtn = this.$refs.uploadBtn;
      uploadBtn.click();
      this.actionSelectShow = false;
    },
    uploadImgChange(e) {
      let file = e.target.files[0];
      let that = this;
      this.avatarUrl = URL.createObjectURL(file);
    },
    savePhoto(){

    },
  },
  mounted(){
    document.title = '个人头像';
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

    .yo-scroll{
      background-color: #000;
    }
    .avatar-img{
      width: 100%;
      margin-top: 30%;
    }


  
</style>