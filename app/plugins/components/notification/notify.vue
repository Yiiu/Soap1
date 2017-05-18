<template>
    <div
        :class="['notify' ,type]"
    >
        {{content}}
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String
        },
        content: {
            type: String,
            default: ''
        },
        onClose: Function,
        time: {
            type: Number,
            default: 1000
        },
        index: Number
    },
    mounted () {
        if (this.time !== 0) {
            this.$el.addEventListener('transitionend', () => {
                setTimeout(this.close, this.time)
            })
        }
    },
    methods: {
        close () {
            if (typeof this.onClose === 'function') {
                this.onClose()
            }
            this.$emit('close', this.index)
        }
    }
}
</script>