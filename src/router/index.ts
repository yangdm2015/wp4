import VueRouter from 'vue-router';
import Vue from 'vue';
import Test from "pages/Test/index.vue";
import Table from "pages/Table/index.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Test,
    name: "测试",
  },
  {
    path: "/table",
    component: Table,
    name: "表格",
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