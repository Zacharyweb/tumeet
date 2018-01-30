import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/views/Demo'
import Home from '@/views/Home'
import CreateChat from '@/views/CreateChat'
import SearchResult from '@/views/SearchResult'
import AddressBook from '@/views/AddressBook'
import FriendDeatil from '@/views/FriendDeatil'
import EditFriendDeatil from '@/views/EditFriendDeatil'
import AddFriends from '@/views/AddFriends'
import NewFriends from '@/views/NewFriends'
import AddTelFriends from '@/views/AddTelFriends'

import SearchByAccount from '@/views/SearchByAccount'
import SearchInTelBook from '@/views/SearchInTelBook'
import SearchContacts from '@/views/SearchContacts'



import Found from '@/views/Found'
import Mine from '@/views/Mine'

import SignIn from '@/views/SignIn'
import ExpertDetail from '@/views/ExpertDetail'
import TopicDetail from '@/views/TopicDetail'
import Appointment from '@/views/Appointment'
import Category from '@/views/Category'
import BecomeExpert from '@/views/BecomeExpert'

import Base from '@/views/Upgrade/Base'
import Intro from '@/views/Upgrade/Intro'
import Check from '@/views/Upgrade/Check'

import EditTopic from '@/views/EditTopic'
import EditAritcle from '@/views/EditAritcle'

import Relation from '@/views/MyRelation'
Vue.use(Router)

export default new Router({
  routes: [
    // 测试页
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    // 首页
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // 首页
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    // 发起对话
    {
      path: '/createChat',
      name: 'CreateChat',
      component: CreateChat
    },
    // 首页综合搜索页
    {
      path: '/search',
      name: 'Search',
      component: SearchResult
    },
    // 搜索通讯录好友页
    {
      path: '/searchInTelBook',
      name: 'SearchInTelBook',
      component: SearchInTelBook
    },
    // 搜索通好友通过微信/手机号页
    {
      path: '/searchByAccount',
      name: 'SearchByAccount',
      component: SearchByAccount
    },
    // 搜索通讯录好友
    {
      path: '/searchContacts',
      name: 'SearchContacts',
      component: SearchContacts
    },

    // 通讯录
    {
      path: '/address',
      name: 'AddressBook',
      component: AddressBook
    },
    // 通讯录好友详情
    {
      path: '/friendDeatil/:friendId',
      name: 'FriendDeatil',
      component: FriendDeatil
    }, 
    // 修改好友备注
    {
      path: '/editFriendDeatil/:friendId',
      name: 'EditFriendDeatil',
      component: EditFriendDeatil
    }, 

    // 添加朋友
    {
      path: '/addFriend',
      name: 'AddFriends',
      component: AddFriends
    },
    // 新的朋友
    {
      path: '/newFriends',
      name: 'NewFriends',
      component: NewFriends
    },
    // 添加手机联系人
    {
      path: '/addTelFriends',
      name: 'AddTelFriends',
      component: AddTelFriends
    },











    //发现
    {
      path: '/found',
      name: 'Found',
      component: Found
    },
    //我的
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    // 注册
    {
      path: '/sign',
      name: 'Sign',
      component: SignIn
    },
 
    // 专家详情
    {
      path: '/expert/:expertId',
      name: 'ExpertDetail',
      component: ExpertDetail,
      children: [
        { path: 'bar', component: TopicDetail }
      ]
    },
    // 话题详情
    {
      path: '/expert/:expertId/topic/:topicId',
      name: 'TopicDetail',
      component: TopicDetail
    },
    // 预约页
    {
      path: '/appointment',
      name: 'Appointment',
      component: Appointment
    },
    //分类页
    {
      path: '/cate',
      name: 'Category',
      component: Category
    },
    //成为专家
    {
      path: '/upgrade',
      name: 'BecomeExpert',
      component: BecomeExpert,
      children:[
        { path: '/',name: 'Base',component: Base},
        { path: 'intro',name: 'Intro',component: Intro},
        { path: 'check',name: 'Check',component: Check}
      ]
    },
    //编辑、添加话题
    {
      path: '/etopic/:type',
      name: 'EditTopic',
      component: EditTopic
    },
    //编辑、添加文章
    {
      path: '/earticle/:type',
      name: 'EditAritcle',
      component: EditAritcle
    },
    //我的关系
    {
      path: '/relation',
      name: 'Relation',
      component: Relation
    },
   
  ]
})
