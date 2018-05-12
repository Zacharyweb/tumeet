import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    accessToken:null,
    apiUid:null
};

const getters = {
   
};

const actions = {
	login({ commit }) {
        commit(saveUserMsg)
    },
    logout({ commit }){
        commit(removeUserMsg)
    }
};


const mutations = {
	saveUserMsg(state, msg) {
       state.accessToken = msg.accessToken;
       state.apiUid = msg.apiUid;  
       console.log(status);
	},
    removeUserMsg(state, direction) {
       state.accessToken = null;
       state.apiUid = null;  
    }
};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})