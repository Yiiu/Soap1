export default async function (schema, options) {
    let addObj = {hash: 'string'}
    schema.add(addObj)
    // 模型的注册方法
    schema.statics.register = async function (user, pwd) {
        if (!user instanceof this) {
            user = new this(user)
        }
        let userInfo = await this.findByUsername(user.username)
        if (userInfo) throw 'userExists'
    }
    // 模型的用户名查找方法
    schema.statics.findByUsername = async function (userName) {
        let userInfo = await schema.statics.findByUsername(userName)
        return userInfo
    }
}