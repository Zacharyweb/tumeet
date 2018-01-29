<template>
  <div class="header-nav-wrap">
      <div class="header-nav">
        <div class="header-nav-sec header-nav-left">
            <slot name="left">
              <span v-if="hasReturnIcon" class="return-icon iconfont icon-jiantou-" @click="returnBack"></span>
            </slot>
        </div>
        <div class="header-nav-sec header-nav-center">
            <slot name="center">
               <h2>{{title}}</h2>
            </slot>
        </div>
        <div class="header-nav-sec header-nav-right">
            <slot name="right">
               
            </slot>
        </div>      
      </div>
      <div class="header-nav-shim"></div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  props: {
    title: {
      type: String,
      default: ''
    },
    hasReturnIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
         
    }
  },
  methods:{
    returnBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
  .header-nav{
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    left: 0;
    top:0;
    height: 50px;
    padding:15px;
    background-color: #67bfe7;
    display: flex;
    justify-content: space-between;
  }
  .header-nav-shim{
    height: 50px;
  }
  .header-nav img{
    height: 20px;
    width: auto;
  }
  .header-nav h2{
    font-size: 18px;
    line-height: 20px;

  }
  .header-nav .header-nav-sec{
     position: absolute;
     height: 20px;
     top:50%;
     margin-top: -10px;
     color: #fff;
     line-height: 20px;
     display: flex;
     align-items: center;
  }

  .header-nav .header-nav-left{
    left: 15px;
  }
  .header-nav .return-icon{
    position: absolute;
    left: 0;
    top: 0;
    color:#fff;
    font-size: 20px;
  }

  .header-nav .header-nav-center{
    left: 50%;
    transform: translateX(-50%);
  }
  .header-nav .header-nav-right{
      right: 15px;
  }
</style>
