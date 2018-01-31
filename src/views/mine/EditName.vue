<template>
  <div>
    <header-nav :title="'设置名字'">
      <div slot="left">
        <span class="nav_action_btn" @click="toBack">取消</span>
      </div>
      <div slot="right">
        <span  class="nav_action_btn fc_grey" @click="submitEdit">完成</span>  
      </div>
    
    </header-nav>
    <v-scroll  :on-refresh="onRefresh" :bottom="0" :top="50">
      <div class="name_input_wrap">
        <input ref="nameInput" type="text" v-model="userName">
      </div>
    </v-scroll>

 
  </div>
</template>

<script>

import HeaderNav from '../../components/HeaderNav.vue'
import Scroll  from '../../components/Scroll.vue'
import T from '../../tool/tool'

export default {
  name: 'EditName',
  components:{
    'header-nav': HeaderNav,
    'v-scroll': Scroll,
  },
  data () {
    return {
      userName:''
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
    submitEdit(){
        console.log(this.userName);
        this.toBack();
    }
  },
  mounted(){
    let nameInput = this.$refs.nameInput;
    nameInput.focus();
    this.userName = "肖总m";
  }
}
</script>
<style scoped>
 

  .nav_action_btn{
    font-size: 16px;
  }
  .nav_action_btn.fc_grey{
    color: #585858;
  }

  .name_input_wrap{
    margin-top: 15px;
    background-color: #fff;
    height: 44px;
    padding:0 20px;
  }
  .name_input_wrap input{
    height:44px;
    width: 100%;
    border:none; 
  }

  
</style>