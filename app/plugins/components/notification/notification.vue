<template>
    <div class="notify-box">
        <transition-group name="notification-list" tag="div">
            <notify
                v-for="(item, index) in data"
                :key="item.id"
                :type="item.type"
                :index="index"
                :time="item.time"
                :content="item.content"
                v-on:close="closes"
            ></notify>
        </transition-group>
    </div>
</template>
<script>
import notify from './notify.vue'
export default {
    name: 'Alert',
    data () {
        return {
            data: []
        }
    },
    methods: {
        closes (id) {
            this.data.splice(id, 1)
        }
    },
    components: {
        notify
    }
}
</script>
<style lang="less">
@import "./notify";
</style>