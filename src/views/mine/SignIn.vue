<template>
  <div>
    <div class="signin-form">
      <p class="signin-form-item">
          <span class="iconfont icon-p-shouji"></span>
          <input type="tel" maxlength="11" placeholder="请输入手机号" v-model="tel">
          <span class="get-code-btn" @click="getCode" v-if="!hasGetCode">发送验证码</span>
          <span class="has-get-code" v-if="hasGetCode">剩余{{countTimeNum}}秒</span>
      </p>
      <p class="signin-form-item">
          <span class="iconfont icon-yanzhengma"></span>
          <input type="tel" maxlength="4" placeholder="请输入短信验证码" v-model="code">
      </p>
    </div>
    <div class="btn-wrapper">
      <p class="btn btn-blue btn-large" @click="signIn">立即登录</p>
    </div>

  </div>
</template>

<script>
import HeaderNav from '../../components/HeaderNav.vue'
export default {
  name: 'SignIn',
  components:{
    'header-nav': HeaderNav
  },
  data () {
    return {
      tel:'',
      code:'',
      hasGetCode: false,
      countTimer: null,
      countTimeNum: 59
    }
  },
  methods:{
    getCode(){
       this.hasGetCode = true;
       this.countGetCodeTime();   
    },
    countGetCodeTime(){
       this.countTimer = setInterval(()=>{
         this.countTimeNum--;
         if(this.countTimeNum == 0){
           clearInterval(this.countTimer);
           this.hasGetCode= false;
           this.countTimeNum = 59;
         }
       },1000)
    },
    signIn(){
      let tel = this.tel;
      let code = this.code;
      this.$router.push('/');
    }
  },
  mounted(){
     
  }
}
</script>
<style scoped>
.signin-form {
  margin-top: 100px;
  padding: 0 15px;
  background-color: #fff;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
}
.signin-form .signin-form-item {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 5px;
  font-size: 20px;
  position: relative;
}
.signin-form .signin-form-item+.signin-form-item{
  border-top: 1px solid #e6e6e6;
}
.signin-form .signin-form-item input {
  flex: 1;
  padding-left: 20px;
  border: none;
  background-color: #fff;
  font-size: 14px;
  height: 24px;
}
.signin-form .signin-form-item .iconfont {
  color: #888;
  font-size: 22px;
}
.signin-form .signin-form-item .get-code-btn,
.signin-form .signin-form-item .has-get-code {
  font-size: 14px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  padding-left: 10px;
  border-left: 1px solid #e6e6e6;
}
.signin-form .signin-form-item .get-code-btn {
  color: #67bfe7;
}
.signin-form .signin-form-item .has-get-code {
  color: #888;
}
.btn-wrapper {
  margin-top: 20px;
  padding:0 15px;
}
</style>