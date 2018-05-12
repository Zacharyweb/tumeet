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
import {mapState,mapActions} from 'vuex'
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
      localStorage.setItem('apiUid',tel);
      localStorage.setItem('accessToken',code);
  
      this.$store.commit('saveUserMsg',{apiUid:tel,accessToken:code});
      const redirect = decodeURIComponent(this.$route.query.redirect || '/');
  
      this.$router.replace({path: redirect});
      // this.axios.get('get',{params:{name:'zj',age:25}});
      // this.axios.post('post',{name:'wmj',age:24});
    },
      // loginByPassword(){
      //       if(this.ajaxing){
      //            return;
      //       }
      //       if(this.mobile == ''){
      //           this.showMsg({content:'手机号码不能为空！'});return;
      //       }

      //       if(!/^1[3-8]\d{9}$/.test(this.mobile)){
      //           this.showMsg({content:'输入的手机号码格式有误'});return;
      //       }

      //       if(this.password == ''){
      //          this.showMsg({content:'密码不能为空'});return;
      //       }

      //       if(!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)[^\s]{6,18}$/.test(this.password)){
      //           this.showMsg({content:'密码格式有误'});return;
      //       }

      //     let data={
      //       mobile:this.mobile,
      //       password:this.password
      //     }
      //       this.axios.post(api.loginByPassword,data).then(res => {
      //           if(res.data.code=='0'){
      //               this.handleLoginAfter(res.data.result)
      //           }
      //       })
      //   },
      //   handleLoginAfter(result){
      //       const redirect = decodeURIComponent(this.$route.query.redirect || '/'),
      //               source = this.$route.query.source;
            
      //       localStorage.setItem('LR_APIUID',result.uid);
      //       localStorage.setItem('LR_ACCESSTOKEN',result.accessToken);
      //       localStorage.setItem('LR_USER',JSON.stringify(result));
      //       this.$store.commit(types.RECEIVE_USERINFO,result);
      //       this.$store.commit(types.SUCCESS_LOGIN,{uid:result.uid,accessToken:result.accessToken});
      //       // 活动工程登录状态跨域方案
      //       let activityIp=httpConfig.activityIp
      //       let csCookie = new CSCookie(activityIp);
      //       csCookie.setItem('LR_ACCESSTOKEN',result.accessToken);
      //       csCookie.setItem('LR_APIUID',result.uid);
      //       csCookie.init(()=>{
      //           if(source){
      //               // window.location.href = redirect;
      //               window.location.replace(redirect);
      //           }else{
      //               this.$router.replace({path: redirect})
      //           }
      //       });
      //   },
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