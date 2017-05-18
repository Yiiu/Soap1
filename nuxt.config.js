/**
 * Created by yuer on 2017/5/17.
 */
import fp from 'path'
function relative (path) {
    return fp.join(__dirname, path)
}

export default {
    cache: true,
    srcDir: relative('./app'),
    build: {
        vendor: ['axios']
    },
    plugins: [
        {
            src: '~plugins/components',
            ssr: false
        },
        {
            src: '~plugins/axios.js'
        }
    ],
    css: [
        {
            src: '~assets/styles/basics.less',
            lang: 'less'
        },
        {
            src: '~assets/styles/main.less',
            lang: 'less'
        }
    ],
    head: {
        title: 'Soap',
        meta: [
            { charset: 'utf-8' }
        ],
        link: [
            { rel: 'stylesheet', href: '//at.alicdn.com/t/font_2l68ury1eyfa8aor.css' }
        ]
    },
}