import mongoose from './mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

let Schema = mongoose.Schema

let userSchema = new Schema({
    nickname: {
        type: String
    },
    name: {
        type: String,
        unique: true,
        index: 1
    },
    email: {
        type: String,
        index: 1
    },
    url: {
        type: String
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

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'nickname',
    limitAttempts: true
})


let user = mongoose.model('user', userSchema)

export default user