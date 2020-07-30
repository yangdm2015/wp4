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
                    @open="handleOpen"
                    @close="handleClose"
                    :collapse="isCollapse"
                >
                    <el-menu-item index="0">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航1</span>
                    </el-menu-item>
                      <el-menu-item index="1">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航2</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                  <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>    

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

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
}
</script>