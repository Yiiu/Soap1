import * as NodeOAuthServer from 'oauth2-server'

import {
  AuthorizationCodeModel,
  ClientCredentialsModel,
  ServerOptions,
  OAuth2Server,
  RefreshTokenModel,
  PasswordModel,
  ExtensionModel,
  Token,
  Callback,
  Falsey,
  AuthorizationCode
} from 'oauth2-server'

import dbClient, { Client } from '../model/Client'
import dbUser, { User } from '../model/User'

export default class OAuth2  {
  private server: NodeOAuthServer

  public getAccessToken = async (accessToken: string, callback?: Callback<Token>): Promise<Token> => {
    console.log('getAccessToken', accessToken)
    return
  }

  public getClient = (clientId: string, clientSecret: string, callback?: Callback<Client | Falsey>): Promise<Client | Falsey> => {
    console.log('getClient', clientId, clientSecret)
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
    console.log('getUser', username, password)
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
