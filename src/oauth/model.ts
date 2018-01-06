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
  Client,
  User,
  Callback,
  Falsey
} from 'oauth2-server'
import { Promise } from 'mongoose';

type model = AuthorizationCodeModel | ClientCredentialsModel | RefreshTokenModel | PasswordModel | ExtensionModel

export default class OAuth2 {
  private server: NodeOAuthServer

  public getAccessToken = (bearerToken: string, callback?: Callback<Token>): Promise<Token> => {
    console.log('getAccessToken', bearerToken)
    return new Promise()
  }

  public getClient = (clientId: string, clientSecret: string, callback?: Callback<Client | Falsey>): Promise<Client | Falsey> => {
    console.log('getClient', clientId, clientSecret)
    return new Promise()
  }

  public saveAccessToken = (accessToken: string, clientId: string, expires: Date, user: object, callback?: () => void) => {
    console.log('saveAccessToken', accessToken, clientId, expires)
    return () => {
      return
    }
  }
  public saveToken = (token: Token, client: Client, user: User, callback?: Callback<Token>): Promise<Token> => {
    console.log('saveToken', token, client, user)
    return new Promise()
  }

  public verifyScope = (token: Token, scope: string, callback?: Callback<boolean>): Promise<boolean> => {
    console.log('verifyScope', token, scope)
    return new Promise()
  };
}
