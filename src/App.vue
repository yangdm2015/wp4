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
                        v-for="(item,index) in $router.options.routes.filter(i=>i.name)"
                        :key="item.path"
                    >
                        <el-submenu :index="index" v-if="item.children">
                            <i class="el-icon-menu"></i>
                            <el-menu-item
                                v-for="child in item.children"
                                :key="child.path"
                                :index="child.path"
                            >
                                <span slot="title">{{child.name}}</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="item.path">
                            <i class="el-icon-location"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </div>
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