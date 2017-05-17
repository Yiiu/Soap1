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
        ]
    },
}