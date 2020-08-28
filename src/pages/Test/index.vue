<template>
    <div>
        test1
        {{modeByer}}
        <el-button @click="c">改变</el-button>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from "vue-class-component";
function modeByer(test:test) {
    return test.s + "haha";
}
@Component
export default class test extends  Vue{
    s: String = "1";
    c(){
        // console.log('this=',this)
        this.s=''+Number(this.s)*2
    }
    get modeByer() {
        return modeByer(this);
    }
}
</script>