import AbstractType from './abstractType'
import { ApiError } from '../../util/error'

export default class PasswordType extends AbstractType {
  constructor (options: any) {
    super(options)
  }
  public handle = async (req, client) => {
    const user = await this.getUser(req);
    return await this.saveToken(user, client);
  }
  public getUser = async (req) => {
    const user = await this.model.getUser(req.body.username, req.body.password)
    if (!user) {
      throw new ApiError(401, 'invalid_user')
    }
    return user
  }
}