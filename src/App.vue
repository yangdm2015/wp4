<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          :router="true"
          :collapse="isCollapse"
        >
          <div
            v-for="(item, index) in $router.options.routes.filter(
              (i) => i.name
            )"
            :key="item.path"
          >
            <el-submenu :index="index" v-if="item.children">
              <i class="el-icon-menu"></i>
              <el-menu-item
                v-for="child in item.children"
                :key="child.path"
                :index="child.path"
              >
                <span slot="title">{{ child.name }}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.path">
              <i class="el-icon-location"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
interface Person {
  date: String;
  name: String;
  address: String;
}
@Component
export default class App extends Vue {
  word: string = "天涯共此时";
  isCollapse: Boolean = false;
  handleOpen(key: String, keyPath: String) {
    console.log(key, keyPath);
  }
  handleClose(key: String, keyPath: String) {
    console.log(key, keyPath);
  }
  tableData: Array<Person> = [
    {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄",
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄",
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄",
    },
  ];
}
</script>
