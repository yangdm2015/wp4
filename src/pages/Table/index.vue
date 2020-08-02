<template>
    <div>
        <h1>我是表格wraper32</h1>
        <el-button @click="changeShow">点我{{show?'隐藏':'显示'}}</el-button>
        <div v-if="show">
            <tb></tb>
        </div>
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

@Component({
    components: {
        tb: () => import("./tb.vue")
    }
})
export default class tbPage extends Vue {
    show: Boolean = false;
    changeShow() {
        this.show = !this.show;
    }
}
</script>