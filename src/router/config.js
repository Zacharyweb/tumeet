'use strict'
export default [
    // 测试页
    {
      path: '/demo',
      name: 'Demo',
      component: function(resolve) {
        require(['@/views/Demo'], resolve);
      }
    },

    // 首页
    {
      path: '/',
      redirect: '/home',
      // meta: {
      //       requireAuth: true,
      //       title:''
      // },
      // component: function(resolve) {
      //   require(['@/views/tumeet/Index'], resolve);
      // }
    },
    // 首页
    {
      path: '/home',
      name: 'Home',
      meta: {
            requireAuth: true,
            title:''
      },
      component: function(resolve) {
        require(['@/views/tumeet/Index'], resolve);
      }
    },
    // 发起对话
    {
      path: '/createChat',
      name: 'CreateChat',
      meta: {
            requireAuth: true,
            title:''
      },
      component: function(resolve) {
        require(['@/views/tumeet/CreateChat'], resolve);
      }
    },
    // 首页综合搜索页
    {
      path: '/search',
      name: 'Search',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/tumeet/SearchResult'], resolve);
      }
    },


    // 存档页
    {
      path: '/save',
      name: 'SavePage',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/save/Index'], resolve);
      }
    },

    // 通讯录
    {
      path: '/address',
      name: 'AddressBook',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/contacts/Index'], resolve);
      }
    },

    // 搜索通讯录好友页
    {
      path: '/searchInTelBook',
      name: 'SearchInTelBook',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/contacts/SearchInTelBook'], resolve);
      }
    },
    // 搜索通好友通过微信/手机号页
    {
      path: '/searchByAccount',
      name: 'SearchByAccount',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/contacts/SearchByAccount'], resolve);
      }
    },
    // 搜索通讯录好友
    {
      path: '/searchContacts',
      name: 'SearchContacts',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/contacts/SearchContacts'], resolve);
      }
    },
    // 通讯录好友详情
    {
      path: '/friendDeatil/:friendId',
      name: 'FriendDeatil',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/contacts/FriendDeatil'], resolve);
      }
    }, 
    // 修改好友备注
    {
      path: '/editFriendDeatil/:friendId',
      name: 'EditFriendDeatil',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/contacts/EditFriendDeatil'], resolve);
      }
    }, 
    // 修改好友名字
    {
      path: '/editFriendName/:friendId',
      name: 'EditFriendsName',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/contacts/EditFriendsName'], resolve);
      }
    },

    // 添加朋友
    {
      path: '/addFriend',
      name: 'AddFriends',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/contacts/AddFriends'], resolve);
      }
    },

    // 新的朋友
    {
      path: '/newFriends',
      name: 'NewFriends',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/contacts/NewFriends'], resolve);
      }
    },

    // 添加手机联系人
    {
      path: '/addTelFriends',
      name: 'AddTelFriends',
         meta: {
            requireAuth: true,
            title:''
        },
      component: function(resolve) {
        require(['@/views/contacts/AddTelFriends'], resolve);
      }
    },

     //我的
     {
       path: '/mine',
       name: 'Mine',
          meta: {
            requireAuth: true,
            title:''
        },
       component: function(resolve) {
        require(['@/views/mine/Index'], resolve);
       }
     },
     {
       path: '/avatar',
       name: 'Avatar',
          meta: {
            requireAuth: true,
            title:''
        },
       component: function(resolve) {
        require(['@/views/mine/Avatar'], resolve);
       }
     },
     {
       path: '/set',
       name: 'SetUp',
          meta: {
            requireAuth: true,
            title:''
        },
       component: function(resolve) {
        require(['@/views/mine/Set'], resolve);
       }
     },
     {
       path: '/qrcode',
       name: 'QRcode',
          meta: {
            requireAuth: true,
            title:''
        },
       component: function(resolve) {
        require(['@/views/mine/QRcode'], resolve);
       }
     },
     {
       path: '/edName',
       name: 'EditName',
          meta: {
            requireAuth: true,
            title:''
        },
       component: function(resolve) {
        require(['@/views/mine/EditName'], resolve);
       }
     },
     // 注册
     {
       path: '/sign',
       name: 'Sign',
          // meta: {
      //       requireAuth: true,
      //       title:''
      // },
       component: function(resolve) {
        require(['@/views/mine/SignIn'], resolve);
       }
     },
      //会话
      {
        path: '/chat/:id/:floor',
        name: 'ChatRoom',
        meta: {
            requireAuth: true,
            title:''
        },
        component: function(resolve) {
          require(['@/views/chat/Index'], resolve);
         }
      },
  ];

