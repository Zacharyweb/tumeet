import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/views/Demo'


import Home from '@/views/tumeet/Index'
import CreateChat from '@/views/tumeet/CreateChat'
import SearchResult from '@/views/tumeet/SearchResult'


import SavePage from '@/views/save/Index'


import AddressBook from '@/views/contacts/Index'
import FriendDeatil from '@/views/contacts/FriendDeatil'
import EditFriendDeatil from '@/views/contacts/EditFriendDeatil'
import EditFriendsName from '@/views/contacts/EditFriendsName'
import AddFriends from '@/views/contacts/AddFriends'
import NewFriends from '@/views/contacts/NewFriends'
import AddTelFriends from '@/views/contacts/AddTelFriends'
import SearchByAccount from '@/views/contacts/SearchByAccount'
import SearchInTelBook from '@/views/contacts/SearchInTelBook'
import SearchContacts from '@/views/contacts/SearchContacts'




import Mine from '@/views/mine/Index'
import Avatar from '@/views/mine/Avatar'
import SetUp from '@/views/mine/Set'
import QRcode from '@/views/mine/QRcode'
import EditName from '@/views/mine/EditName'
import SignIn from '@/views/mine/SignIn'

//会话
import ChatRoom from '@/views/chat/Index'


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


    // 存档页
    {
      path: '/save',
      name: 'SavePage',
      component: SavePage
    },

    // 通讯录
    {
      path: '/address',
      name: 'AddressBook',
      component: AddressBook
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
    // 修改好友名字
    {
      path: '/editFriendName/:friendId',
      name: 'EditFriendsName',
      component: EditFriendsName
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

     //我的
     {
       path: '/mine',
       name: 'Mine',
       component: Mine
     },
     {
       path: '/avatar',
       name: 'Avatar',
       component: Avatar
     },
     {
       path: '/set',
       name: 'SetUp',
       component: SetUp
     },
     {
       path: '/qrcode',
       name: 'QRcode',
       component: QRcode
     },
     {
       path: '/edName',
       name: 'EditName',
       component: EditName
     },
     // 注册
     {
       path: '/sign',
       name: 'Sign',
       component: SignIn
     },
      //会话
      {
        path: '/chat/:id',
        name: 'ChatRoom',
        component: ChatRoom
      },



  ]
})
