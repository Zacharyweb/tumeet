import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './config'
import store from '../store'

Vue.use(VueRouter);

// 页面刷新时，重新赋值
const apiUid = window.localStorage.getItem('apiUid'),
      accessToken = window.localStorage.getItem('accessToken');
      
if (apiUid && accessToken) {
    store.commit('saveUserMsg',{apiUid:apiUid,accessToken:accessToken})
};


const router = new VueRouter({
  routes: routerConfig,
});


router.beforeEach((to, from, next) => {
    if(to.name!='home'){
        document.title = to.meta.title || 'tumeet';
    };
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.apiUid && store.state.accessToken) {
            next();
        }
        else {
            next({
                name: 'Sign',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;