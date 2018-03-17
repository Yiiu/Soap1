import { Model } from 'mongoose';
import TokenHandles from './handles/token'

import { Imodel } from './handles/token'

export type Falsey = '' | 0 | false | null | undefined;

export interface OauthConfig {
  model: Imodel
  accessTokenLifetime?: number
  refreshTokenLifetime?: number
}

export default class Oauth {
  private options: any
  constructor (config: OauthConfig) {
    this.options = config
  }

  public token = async (req, res) => {
    const Token = new TokenHandles(this.options)
    return await Token.handle(req, res)
  }
}