import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("@/pages/login.vue"),
    name: "login",
    meta: { title: "物联网卡平台-登录" },
  },
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "index",
    meta: { title: "物联网卡平台-首页" },
    children: [
      {
        path: "/index",
        component: () => import("@/pages/index.vue"),
        name: "index",
        meta: { title: "物联网卡平台-首页" },
      },
      {
        path: "/system",
        component: () => import("@/pages/system.vue"),
        name: "system",
        meta: { title: "物联网卡平台-系统页" },
      },
      {
        path: "/user",
        component: () => import("@/pages/user.vue"),
        name: "user",
        meta: { title: "物联网卡平台-用户页" },
      },
    ],
  },
];

const router = createRouter({ history: createWebHashHistory(), routes });
declare let document: { title: unknown };
router.beforeEach((to, from, next): void => {
  const title = to.meta.title;
  if (title) {
    document.title = title;
  }
  const token = localStorage.getItem("data") || "";
  
  if (to.path === '/login') next()
  token ? next() : next('login');
  
});

export default router;
