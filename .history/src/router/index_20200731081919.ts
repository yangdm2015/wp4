import VueRouter from 'vue-router';
import Vue from 'vue';
import Test from "pages/Test/index.vue";
// import Table from "pages/Table/index.vue";
const Table = () => {
    // let r = import("pages/Test/index.vue");
    const r = require("pages/Test/index.vue")
    console.log('r=',r)
    // return Promise.resolve(r)
    return r
}


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/test',
  },
  {
    path: "/table",
    component: Table,
    name: "表格",
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