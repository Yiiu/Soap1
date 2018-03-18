import { OauthConfig } from './../oauth';

import { ApiError } from '../../util/error'
import { Imodel } from '../oauth'

export default class Authenticate {
  private model: Imodel
  constructor (options: OauthConfig) {
    this.model = options.model
  }

  public handle = async (req, res) => {
    const token = this.getTokenFromRequest(req)
    const accessToken = await this.getAccessToken(token)
    this.validateAccessToken(accessToken)
    req.auth = accessToken
  }

  public getTokenFromRequest = (req) => {
    const token = req.headers.authorization
    if (!token) {
      throw new ApiError(401, 'invalid_authorization')
    }
    return token.match(/Bearer\s(\S+)/)[1]
  }

  public getAccessToken = async (token: string) => {
    const accessToken = await this.model.getAccessToken(token)
    if (!accessToken) {
      throw new ApiError(401, 'invalid_access_token')
    }
    return accessToken
  }
  
  public validateAccessToken = (accessToken) => {
    if (!(accessToken.accessTokenExpiresAt instanceof Date)) {
      throw new ApiError(401, 'invalid_access_token_expires_at');
    }
  
    if (accessToken.accessTokenExpiresAt < new Date()) {
      throw new ApiError(401, 'invalid_access_token_expired');
    }

    return accessToken;
  }
}