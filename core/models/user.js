import mongoose from './mongoose'
import Plugins from '../plugins/user'

let Schema = mongoose.Schema

let userSchema = new Schema({
    nickname: {
        type: String,
        default: null
    },
    hash: {
        type: String,
        default: null
    },
    salt: {
        type: String,
        default: null
    },
    login_at: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    },
    description: {      // 简介
        type: String,
        default: '这个人很懒，啥也没留下。。。'
    },
    avatar: {
        type: String,
        default: null
    },
    cover: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    website: {
        type: Date,
        default: null
    },
    location: {
        type: String,
        default: null
    }
})
userSchema.plugin(Plugins)


userSchema.pre('save', async function (next) {
    this.nickname = this.username
    next()
})

let user = mongoose.model('user', userSchema)
export default user