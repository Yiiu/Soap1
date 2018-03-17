import AbstractType from './abstractType'
import { ApiError } from '../../util/error'

export default class PasswordType extends AbstractType {
  constructor (options: any) {
    super(options)
  }
  public handle = async (req, client) => {
    const token = await this.getRefreshToken(req);
    await this.revokeToken(token);
    return await this.saveToken(token.user, token.client);
  }
  public getRefreshToken = async (req) => {
    const token = await this.model.getRefreshToken(req.body.refresh_token)
    if (!token) {
      throw new ApiError(401, 'invalid_refresh_token')
    }
    return token
  }
  public revokeToken = async (token) => {
    const isToken = await this.model.revokeToken(token)
    if (!isToken) {
      throw new ApiError(401, 'invalid_refresh_token')
    }
    return isToken
  }
}