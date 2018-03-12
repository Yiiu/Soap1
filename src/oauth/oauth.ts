import { Model } from 'mongoose';
import TokenHandles from './handles/token'

export type Falsey = '' | 0 | false | null | undefined;

export interface OauthConfig {
  model: any
}

export default class Oauth {
  private options: any
  constructor (config: OauthConfig) {
    this.options = config
  }

  public token = (req, res) => {
    const Token = new TokenHandles(this.options)
    Token.handle(req, res)
  }
}