<template>
  <ul class="bottom-nav">
    <li class="nav-item" :class="{'active': navIndex == 0 , 'ongoing': ongoingArr.indexOf(0) != -1}" @click="changeNav('home')">
      <span class="nav_icon icon_tumeet"></span>
      <p class="nav-name">tumeet</p>
    </li>
    <li class="nav-item" :class="{'active': navIndex == 1, 'ongoing': ongoingArr.indexOf(1) != -1}" @click="changeNav('found')">
      <span class="nav_icon icon_mail_list"></span>
      <p class="nav-name">通讯录</p>
    </li>
    <li class="nav-item" :class="{'active': navIndex == 2, 'ongoing': ongoingArr.indexOf(2) != -1}" @click="changeNav('mine')">
      <span class="nav_icon icon_save"></span>
      <p class="nav-name">存档</p>
    </li>
    <li class="nav-item" :class="{'active': navIndex == 3, 'ongoing': ongoingArr.indexOf(3) != -1}" @click="changeNav('mine')">
      <span class="nav_icon icon_mine"></span>
      <p class="nav-name">我</p>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'BottomNav',
  props: {
    navIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
       ongoingArr:[3] 
    }
  },
  methods:{
    changeNav(path){
      this.$router.push(path);
    }
 
  }
}
</script>
<style scoped>
  .bottom-nav{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 49px;
    padding: 0 30px;
    background-color: #e6e6e8;
    border-top: 1px solid #595856;
    justify-content: space-between;
  }
  .bottom-nav .nav-item{
    padding-top: 6px;
    text-align: center;
    color: #a4a4a4;
  }
  .bottom-nav .nav-item.active{
    color: #67c0ea;
  }
  .bottom-nav .nav-item .nav_icon{
    display: block;
    margin:0 auto;
    width: 34px;
    height: 27px; 
  }

  .bottom-nav .nav-item .nav_icon.icon_tumeet{
    background: url(../assets/img/nav_icon1_1.png) no-repeat 0 0;
    background-size: 100% 100%;
  }
  .bottom-nav .nav-item .nav_icon.icon_mail_list{
    background: url(../assets/img/nav_icon1_2.png) no-repeat 0 0;
    background-size: 100% auto;
  }
  .bottom-nav .nav-item .nav_icon.icon_save{
    background: url(../assets/img/nav_icon1_3.png) no-repeat 0 0;
    background-size: 100% auto;
  }
  .bottom-nav .nav-item .nav_icon.icon_mine{
    background: url(../assets/img/nav_icon1_4.png) no-repeat 0 0;
    background-size: 100% auto;
  }

  .bottom-nav .nav-item.active .nav_icon.icon_tumeet{
    background-image: url(../assets/img/nav_icon2_1.png);
  }
  .bottom-nav .nav-item.active .nav_icon.icon_mail_list{
    background-image: url(../assets/img/nav_icon2_2.png);
  }
  .bottom-nav .nav-item.active .nav_icon.icon_save{
    background-image: url(../assets/img/nav_icon2_3.png);
  }
  .bottom-nav .nav-item.active .nav_icon.icon_mine{
    background-image: url(../assets/img/nav_icon2_4.png);
  }


  .bottom-nav .nav-item.ongoing{
    color: #a4a4a4;
  }
  .bottom-nav .nav-item.ongoing .nav_icon.icon_tumeet{
    background-image: url(../assets/img/nav_icon3_1.png);
  }
  .bottom-nav .nav-item.ongoing .nav_icon.icon_mail_list{
    background-image: url(../assets/img/nav_icon3_2.png);
  }
  .bottom-nav .nav-item.ongoing .nav_icon.icon_save{
    background-image: url(../assets/img/nav_icon3_3.png);
  }
  .bottom-nav .nav-item.ongoing .nav_icon.icon_mine{
    background-image: url(../assets/img/nav_icon3_4.png);
  }

  

  .bottom-nav .nav-item .nav-name{
    font-size: 12px;
    line-height: 1;
  }
</style>