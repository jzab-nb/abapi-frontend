export default [
  { path: '/', icon: 'smile', component: './Index/Index' , name: "接口列表"},
  { path: '/interface_info/:id', icon: 'smile', component: './InterfaceInfo/Index' , name: "查看接口", hideInMenu:true},
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' },{ path: '/user/register', component: './User/Register' }] },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理',
    routes: [
      { icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo', name: "接口管理" },
      { path: '/admin', redirect: '/admin/interface_info' },
      // { path: '/admin/sub-page', component: './Admin' , name:"子页面"},
    ],
  },
  { path: '*', layout: false, component: './404' },
];
