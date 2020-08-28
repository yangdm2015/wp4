<template>
    <div>
        <h1>我是表格wraper1</h1>
        <el-button @click="changeShow">点我{{show?'隐藏':'显示'}}</el-button>
        <div v-if="show">
            <tb></tb>
        </div>
        <el-select v-model="s">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
                <!-- <span><span style="opacity:0">%20%20%20</span>{{item.label}}</span> -->
            </el-option>
        </el-select>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import tb from './tb.vue'
interface Person {
    name: string;
    date: string;
    address: string;
}
interface option {
    value: string;
    label: string;
}

@Component({
    components: {
        tb: () => import("./tb.vue")
    }
})
export default class tbPage extends Vue {
    show: Boolean = false;
    s: String = "1";
    options: Array<option> = [
        { value: "1", label: "<span>sds</span>我说的是" }
    ];
    changeShow() {
        this.show = !this.show;
    }
   
}
</script>