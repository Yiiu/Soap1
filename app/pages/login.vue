<template>
    <div class="screen">
        <section class="wrap singup-login">
            <h2 class="title">
                登录
            </h2>
            <label>
                <span>用户名：</span>
                <input v-model="name" type="text">
            </label>
            <label>
                <span>密码：</span>
                <input v-model="password" type="password">
            </label>
            <button class="btn" @click="handleClickLogin">登录</button>
        </section>
    </div>
</template>
<script>
    export default {
        middleware: 'anonymous',
        data (context) {
            return {
                name: '',
                password: ''
            }
        },
        methods: {
            async handleClickLogin () {
                try {
                    let data = await this.$store.dispatch('user/login', {
                        username: this.name,
                        password: this.password
                    })
                    console.log(data)
                    this.$notify.success(data.message)
                    this.$router.replace('/')
                } catch (error) {
                    this.$notify.warning(error.message)
                }
            }
        }
    }
</script>