import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Layout",
    redirect: "/home",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/index/index.vue"),
        meta: {
          //面包屑显示的内容
          title: "首页",
          //菜单图标
          icon: "Menu",
          //页面是否需要缓存
          cache: false,
          //控制菜单是否显示
          hidden: false
        }
      },
      {
        path: "/system",
        name: "system",
        meta: {
          //面包屑显示的内容
          title: "系统管理",
          //菜单图标
          icon: "Menu",
          //页面是否需要缓存
          cache: false,
          //控制菜单是否显示
          hidden: false
        },
        children: [
          {
            path: "/system/user",
            name: "systemuser",
            component: () => import("@/views/system/user/index.vue"),
            meta: {
              //面包屑显示的内容
              title: "菜单管理",
              //菜单图标
              icon: "Menu",
              //页面是否需要缓存
              cache: false,
              //控制菜单是否显示
              hidden: false
            }
          },
          {
            path: "/system/role",
            name: "systemrole",
            component: () => import("@/views/system/role/index.vue"),
            meta: {
              //面包屑显示的内容
              title: "角色管理",
              //菜单图标
              icon: "Menu",
              //页面是否需要缓存
              cache: false,
              //控制菜单是否显示
              hidden: false
            }
          },
          {
            path: "/system/menu",
            name: "systemmenu",
            component: () => import("@/views/system/menu/index.vue"),
            meta: {
              //面包屑显示的内容
              title: "用户管理",
              //菜单图标
              icon: "Menu",
              //页面是否需要缓存
              cache: false,
              //控制菜单是否显示
              hidden: false
            }
          },
        ]
      },
      {
        path: "/goods",
        name: "goods",
        meta: {
          //面包屑显示的内容
          title: "商品管理",
          //菜单图标
          icon: "Menu",
          //页面是否需要缓存
          cache: false,
          //控制菜单是否显示
          hidden: false
        },
        children: [
          {
            path: "/goods/category",
            name: "goodscategory",
            component: () => import("@/views/goods/category/index.vue"),
            meta: {
              //面包屑显示的内容
              title: "商品分类",
              //菜单图标
              icon: "Menu",
              //页面是否需要缓存
              cache: false,
              //控制菜单是否显示
              hidden: false
            }
          },
          {
            path: "/goods/list",
            name: "goodslist",
            component: () => import("@/views/goods/list/index.vue"),
            meta: {
              //面包屑显示的内容
              title: "商品列表",
              //菜单图标
              icon: "Menu",
              //页面是否需要缓存
              cache: false,
              //控制菜单是否显示
              hidden: false
            }
          },
        ]
      },
      {
        path: "/usian",
        name: "usian",
        component: () => import("@/views/link/index.vue"),
        meta: {
          //面包屑显示的内容
          title: "积云官网",
          //菜单图标
          icon: "Menu",
          //页面是否需要缓存
          cache: false,
          //控制菜单是否显示
          hidden: false
        }
      },
      {
        path: "/401",
        name: "NO",
        component: () => import("@/views/error/401.vue"),
        meta: {
          //面包屑显示的内容
          title: "401页面",
          //菜单图标
          icon: "Menu",
          //页面是否需要缓存
          cache: true,
          //控制菜单是否显示
          hidden: true
        }
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NOtFound",
        component: () => import("@/views/error/404.vue"),
        meta: {
          //面包屑显示的内容
          title: "未找到此页面",
          //菜单图标
          icon: "Menu",
          //页面是否需要缓存
          cache: true,
          //控制菜单是否显示
          hidden: true
        }
      },

    ]

  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: dynamicRoutes,
});

export default router;
