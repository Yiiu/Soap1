import { Model } from 'mongoose';

import TokenHandles from './handles/token'
import AuthenticateHandles from './handles/authenticate'

import { AccessToken as AccessTokenInterface } from '../model/AccessToken'
import { RefreshToken as RefreshTokenInterface } from '../model/RefreshToken'
import { User as UserInterface } from '../model/User'
import { Client as ClientInterface } from '../model/Client'

export type Falsey = '' | 0 | false | null | undefined;

export interface TokenInterface {
  accessToken: string
  refreshToken: string
  accessTokenExpiresAt: Date
  refreshTokenExpiresAt: Date
  [key: string]: any
}

export interface Imodel {
  getUser: (
    username: string,
    password: string
  ) => Promise<UserInterface | Falsey>
  getClient: (
    clientId: string,
    clientSecret: string
  ) => Promise<ClientInterface | Falsey>
  saveToken: (
    token: TokenInterface,
    client: ClientInterface,
    user: UserInterface
  ) => Promise<TokenInterface | Falsey>
  getRefreshToken: (
    refreshToken: string
  ) => Promise<RefreshTokenInterface | Falsey>
  revokeToken: (token: AccessTokenInterface) => Promise<boolean>
  getAccessToken: (accessToken: string) => Promise<AccessTokenInterface>
}

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
  public authenticate = async (req, res) => {
    const Token = new AuthenticateHandles(this.options)
    return await Token.handle(req, res)
  }
}