<template>
    <div class="screen">
        <section class="wrap singup-login">
            <h2 class="title">
                注册
            </h2>
            <label>
                <span>用户名：</span>
                <input v-model="name" type="text">
            </label>
            <label>
                <span>邮箱：</span>
                <input v-model="email" type="text">
            </label>
            <label>
                <span>密码：</span>
                <input v-model="password" type="password">
            </label>
            <button class="btn" @click="handleClickSignup">注册</button>
        </section>
    </div>
</template>
<script>
export default {
    middleware: 'anonymous',
    data (context) {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async handleClickSignup () {
            try {
                let data = await this.$store.dispatch('user/signup', {
                    username: this.name,
                    email: this.email,
                    password: this.password
                })
                this.$notify.success(data.message)
                this.$router.replace('/login')
            } catch (error) {
                this.$notify.warning(error.message)
            }
        }
    }
}
</script>