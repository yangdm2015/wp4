<template>
    <div>
        <h1>app</h1>
        <el-button @click="changeShow">点我改变show</el-button>
        <div v-if="show">
            <test />
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            show: false
        }
    },
    components: {
        test: () => import('./components/test/index.vue')
    },
    methods: {
        changeShow() {
            this.show = !this.show
        }
    }
}
</script>