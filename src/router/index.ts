import VueRouter, { RouteConfig } from "vue-router";
import Vue from 'vue';
import Test from "pages/Test/index.vue";
// import Table from "pages/Table/index.vue";
// const Table = () => {
//   let r = import("pages/Test/index.vue");
//   // const r = require("pages/Test/index.vue")
//   console.log('r=',r)
//   // return Promise.resolve(r)
//   return r
// }
// const Table = () =>import("pages/Test/index.vue");


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/test",
  },
  {
    path: "/table",
    name: "表格",
    // component: Table,
    component: () =>
      import(/* webpackChunkName: "Table1234" */ "../pages/Table/index.vue"),
  },
  {
    path: "/test",
    component: Test,
    name: "测试",
  },
];

const Router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
    // return 期望滚动到哪个的位置
  },
});
export default Router;