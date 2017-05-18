<template>
    <header>
        <main>
            <section class="logo">
                <nuxt-link to="/">
                    <Logo/>
                </nuxt-link>
            </section>
            <nav>

            </nav>
            <section class="log" v-if="!userInfo">
                <nuxt-link to="/login">
                    登录
                </nuxt-link>
                <nuxt-link to="/signup">
                    注册
                </nuxt-link>
            </section>
            <section class="info" v-else>
                <i class="iconfont icon-xiaoxizhongxin"></i>
                <nuxt-link :to="`/${userInfo.username}`">
                    <i class="iconfont icon-wode"></i>
                </nuxt-link>
            </section>
        </main>
    </header>
</template>
<script>
 import Logo from '~components/logo'
 export default {
     computed: {
         userInfo () {
             return this.$store.state.user.authUser
         }
     },
     components: {
         Logo
     }
 }
</script>
<style lang="less" scoped>
header {
    width: 100%;
    background: #fff;
    padding: 24px;
    border-bottom: 1px solid #eeeff2;
    main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1010px;
        margin: 0 auto;
        a {
            transition: .3s color;
            color: #999;
            text-decoration: none;
            font-size: 14px;
            &:hover {
                color: #000;
            }
        }
        section.logo {
            font-size: 24px;
            width: 32px;
            height: 32px;
            img {
                width: 48px;
            }
        }
        section.info {
            i.iconfont {
                font-size: 30px;
                margin-left: 12px;
            }
        }
    }
    nav {
        max-width: 1010px;
    }
}
</style>