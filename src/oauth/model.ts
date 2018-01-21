import * as NodeOAuthServer from 'oauth2-server'

import {
  AuthorizationCodeModel,
  ClientCredentialsModel,
  ServerOptions,
  OAuth2Server,
  RefreshTokenModel,
  PasswordModel,
  ExtensionModel,
  Callback,
  Falsey,
  AuthorizationCode
} from 'oauth2-server'

import dbClient, { Client } from '../model/Client'
import dbUser, { User } from '../model/User'
import dbAccessToken, { AccessToken as Token } from '../model/AccessToken'
import dbRefreshToken from '../model/RefreshToken'

export default class OAuth2  {
  private server: NodeOAuthServer

  public getAccessToken = async (accessToken: string, callback?: Callback<Token>): Promise<Token> => {
    console.log('getAccessToken', accessToken)
    return
  }

  public getClient = (clientId: string, clientSecret: string, callback?: Callback<Client | Falsey>): Promise<Client | Falsey> => {
    const config = {
      client_id: clientId,
      client_secret: clientSecret
    }
    return dbClient.findOne(config)
      .then(e => e)
      .catch((err) => {
        console.log('getClient - Err: ', err)
        return null
      })
  }

  public getUser = (username: string, password: string, callback?: Callback<User | Falsey>): Promise<User | Falsey> => {
    const config = {
      username
    }
    return dbUser.findOne(config)
      .then(e => e)
      .catch((err) => {
        console.log('getClient - Err: ', err)
        return null
      })
  }

  public saveAccessToken = (accessToken, clientId, expires, user: object, callback?: () => void) => {
    console.log('saveAccessToken', accessToken, clientId, expires)
    return
  }
  public saveToken = (token: Token, client: Client, user: User, callback?: Callback<Token>): Promise<Token> => {
    let promise = [
      dbAccessToken.create({
        access_token: token.accessToken,
        expires: token.accessTokenExpiresAt,
        client: client._id,
        user: user._id,
        scope: token.scope
      })
    ]
    if (token.refreshToken) {
      promise.push(
        dbRefreshToken.create({ // no refresh token for client_credentials
          refreshToken: token.refreshToken,
          expires: token.refreshTokenExpiresAt,
          client: client._id,
          user: user._id,
          scope: token.scope
        })
      )
    }
    return Promise.all(promise)
      .then(() => {
        return {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          user,
          client,
          ...token
        }
      })
    console.log('saveToken', token, client, user)
    return
  }

  public verifyScope = (token: Token, scope: string, callback?: Callback<boolean>): Promise<boolean> => {
    console.log('verifyScope', token, scope)
    return
  }
  public saveAuthorizationCode = (code: AuthorizationCode, client: Client, user: User, callback?: Callback<AuthorizationCode>): Promise<AuthorizationCode> => {
    console.log('verifyScope', code, client, user)
    return
  }
}